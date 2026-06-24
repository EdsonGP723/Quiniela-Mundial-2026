from django.core.management.base import BaseCommand
from django.utils import timezone
from matches.models import Match, Team
from matches.api_client import APIFootballClient
from datetime import timedelta

class Command(BaseCommand):
    help = 'Actualiza inteligentemente los marcadores consultando la API solo cuando hay partidos activos'

    def handle(self, *args, **kwargs):
        now = timezone.now()
        today = now.date()

        # 1. Buscar partidos de hoy que no estén finalizados
        matches_today = Match.objects.filter(date__date=today).exclude(status='FINISHED')

        if not matches_today.exists():
            self.stdout.write(self.style.NOTICE("No hay partidos activos hoy. No se hacen peticiones."))
            return

        # 2. Verificar si al menos un partido está en ventana de tiempo activa
        # (Desde 5 mins antes de que empiece, hasta ~3 horas después)
        should_poll = False
        for match in matches_today:
            start_window = match.date - timedelta(minutes=5)
            end_window = match.date + timedelta(hours=3)
            
            if start_window <= now <= end_window:
                should_poll = True
                break
                
        if not should_poll:
            self.stdout.write(self.style.NOTICE("Hay partidos hoy, pero ninguno está en ventana activa. No se hacen peticiones."))
            return

        # 3. Hacer UNA sola petición para traer todos los partidos del día
        self.stdout.write(self.style.NOTICE("Hay partidos activos. Consultando API-Football..."))
        client = APIFootballClient()
        fixtures_data = client.get_fixtures(date=today.strftime('%Y-%m-%d'))
        
        updates_made = 0

        for item in fixtures_data:
            fixture = item.get('fixture', {})
            status_data = fixture.get('status', {})
            goals = item.get('goals', {})
            teams = item.get('teams', {})
            
            short_status = status_data.get('short')
            home_team_name = teams.get('home', {}).get('name')
            away_team_name = teams.get('away', {}).get('name')
            
            try:
                # Buscamos el partido por equipos y fecha (hoy)
                match = Match.objects.get(
                    team_a__name=home_team_name,
                    team_b__name=away_team_name,
                    date__date=today
                )
                
                # Mapeo de estados de API-Football a nuestros estados
                # NS: Not Started, FT: Full Time, PEN: Penalty Finish, AET: After Extra Time
                # 1H, 2H, HT, ET: Live statuses
                
                new_status = match.status
                if short_status in ['1H', '2H', 'HT', 'ET', 'P', 'LIVE']:
                    new_status = 'LIVE'
                elif short_status in ['FT', 'AET', 'PEN']:
                    new_status = 'FINISHED'
                    
                # Actualizar si hay cambios en marcador o estado
                changed = False
                
                # Actualizar marcadores si el partido empezó
                if short_status != 'NS':
                    home_goals = goals.get('home')
                    away_goals = goals.get('away')
                    
                    if match.team_a_score != home_goals:
                        match.team_a_score = home_goals
                        changed = True
                        
                    if match.team_b_score != away_goals:
                        match.team_b_score = away_goals
                        changed = True
                        
                if match.status != new_status:
                    match.status = new_status
                    changed = True
                    
                if changed:
                    match.save() # Esto disparará el Signal si cambia a FINISHED
                    updates_made += 1
                    self.stdout.write(self.style.SUCCESS(f"Actualizado: {match} a {home_goals}-{away_goals} ({new_status})"))

            except Match.DoesNotExist:
                continue
            except Match.MultipleObjectsReturned:
                continue

        self.stdout.write(self.style.SUCCESS(f"Se actualizaron {updates_made} partidos."))
