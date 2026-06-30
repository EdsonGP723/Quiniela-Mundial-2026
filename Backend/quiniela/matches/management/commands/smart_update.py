from django.core.management.base import BaseCommand
from django.utils import timezone
from matches.models import Match
from matches.api_client import WorldCup26Client
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

        # 3. Hacer UNA sola petición para traer todos los partidos (la API gratuita no filtra por fecha fácilmente, pero es un JSON ligero)
        self.stdout.write(self.style.NOTICE("Hay partidos activos. Consultando WorldCup26.ir..."))
        client = WorldCup26Client()
        fixtures_data = client.get_games()
        
        updates_made = 0

        for game in fixtures_data:
            # We only care about matches from today
            date_str = game.get('local_date')
            if not date_str:
                continue
            
            # Simple check if the match is today
            if today.strftime("%m/%d/%Y") not in date_str:
                continue

            home_team_name = game.get('home_team_name_en')
            away_team_name = game.get('away_team_name_en')
            
            if not home_team_name or not away_team_name:
                continue

            try:
                # Buscamos el partido por equipos y fecha (hoy)
                match = Match.objects.get(
                    team_a__name=home_team_name,
                    team_b__name=away_team_name,
                    date__date=today
                )
                
                # Mapeo de estados
                new_status = match.status
                if game.get('finished') == 'TRUE':
                    new_status = 'FINISHED'
                elif game.get('time_elapsed') not in ['notstarted', 'finished']:
                    new_status = 'LIVE'
                    
                # Actualizar si hay cambios en marcador o estado
                changed = False
                
                # Actualizar marcadores si el partido empezó (no es SCHEDULED y no tiene notstarted)
                if game.get('time_elapsed') != 'notstarted':
                    home_goals = int(game.get('home_score')) if game.get('home_score') else None
                    away_goals = int(game.get('away_score')) if game.get('away_score') else None
                    
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
                    self.stdout.write(self.style.SUCCESS(f"Actualizado: {match} a {match.team_a_score}-{match.team_b_score} ({new_status})"))

            except Match.DoesNotExist:
                continue
            except Match.MultipleObjectsReturned:
                continue

        self.stdout.write(self.style.SUCCESS(f"Se actualizaron {updates_made} partidos."))
