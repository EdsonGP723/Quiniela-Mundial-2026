from django.core.management.base import BaseCommand
from matches.models import Team, Match
from matches.api_client import APIFootballClient
from datetime import datetime
import pytz

class Command(BaseCommand):
    help = 'Sincroniza los equipos y los partidos iniciales desde API-Football'

    def handle(self, *args, **kwargs):
        client = APIFootballClient()
        self.stdout.write(self.style.NOTICE("Consultando equipos a la API..."))
        teams_data = client.get_teams()

        if not teams_data:
            self.stdout.write(self.style.ERROR("No se obtuvieron equipos. Revisa tu API_FOOTBALL_KEY."))
            return

        teams_created = 0
        for item in teams_data:
            t = item.get('team', {})
            # Buscamos o creamos el equipo basado en el ID o Nombre
            team, created = Team.objects.get_or_create(
                name=t.get('name'),
                defaults={
                    'short_name': t.get('code') or t.get('name')[:3].upper(),
                    'flag_url': t.get('logo')
                }
            )
            if created:
                teams_created += 1

        self.stdout.write(self.style.SUCCESS(f"Se crearon/actualizaron {teams_created} equipos."))

        # Ahora obtenemos los partidos (fixtures)
        self.stdout.write(self.style.NOTICE("Consultando partidos a la API..."))
        fixtures_data = client.get_fixtures()
        matches_created = 0

        for item in fixtures_data:
            fixture = item.get('fixture', {})
            teams = item.get('teams', {})
            
            # API-Football da los equipos de local (home) y visitante (away)
            home_team_data = teams.get('home', {})
            away_team_data = teams.get('away', {})

            try:
                # Buscamos los equipos en nuestra DB
                team_a = Team.objects.get(name=home_team_data.get('name'))
                team_b = Team.objects.get(name=away_team_data.get('name'))
                
                match_date = datetime.fromisoformat(fixture.get('date').replace('Z', '+00:00'))
                
                # Crear el partido si no existe para esos dos equipos y esa fecha
                match, created = Match.objects.get_or_create(
                    team_a=team_a,
                    team_b=team_b,
                    date=match_date,
                    defaults={
                        'status': 'SCHEDULED'
                    }
                )
                if created:
                    matches_created += 1
            except Team.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Equipo no encontrado para el partido {fixture.get('id')}"))

        self.stdout.write(self.style.SUCCESS(f"Se crearon {matches_created} partidos programados."))
