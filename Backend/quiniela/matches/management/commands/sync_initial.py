from django.core.management.base import BaseCommand
from matches.models import Team, Match
from matches.api_client import WorldCup26Client
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

STADIUM_TZ = {
    "1": "America/Mexico_City", "2": "America/Mexico_City", "3": "America/Monterrey",
    "4": "America/Chicago", "5": "America/Chicago", "6": "America/Chicago",
    "7": "America/New_York", "8": "America/New_York", "9": "America/New_York",
    "10": "America/New_York", "11": "America/New_York", "12": "America/Toronto",
    "13": "America/Vancouver", "14": "America/Los_Angeles", "15": "America/Los_Angeles",
    "16": "America/Los_Angeles",
}

class Command(BaseCommand):
    help = 'Sincroniza los equipos y los partidos iniciales desde WorldCup26.ir'

    def handle(self, *args, **kwargs):
        client = WorldCup26Client()
        self.stdout.write(self.style.NOTICE("Consultando equipos a la API..."))
        teams_data = client.get_teams()

        if not teams_data:
            self.stdout.write(self.style.ERROR("No se obtuvieron equipos."))
            return

        teams_created = 0
        for t in teams_data:
            team, created = Team.objects.get_or_create(
                name=t.get('name_en'),
                defaults={
                    'short_name': t.get('fifa_code') or t.get('name_en')[:3].upper(),
                    'flag_url': t.get('flag')
                }
            )
            if created:
                teams_created += 1

        self.stdout.write(self.style.SUCCESS(f"Se crearon/actualizaron {teams_created} equipos."))

        self.stdout.write(self.style.NOTICE("Consultando partidos a la API..."))
        games_data = client.get_games()
        matches_created = 0

        for game in games_data:
            try:
                # Si home_team_name_en no existe, puede ser un partido de fase eliminatoria aún no definido
                home_name = game.get('home_team_name_en')
                away_name = game.get('away_team_name_en')
                
                if not home_name or not away_name:
                    continue

                team_a = Team.objects.get(name=home_name)
                team_b = Team.objects.get(name=away_name)
                
                # Formato: MM/DD/YYYY HH:MM -> 06/11/2026 13:00
                date_str = game.get('local_date')
                stadium_id = str(game.get('stadium_id'))
                if not date_str or stadium_id not in STADIUM_TZ:
                    continue
                naive_dt = datetime.strptime(date_str, "%m/%d/%Y %H:%M")
                local_tz = ZoneInfo(STADIUM_TZ[stadium_id])
                local_dt = naive_dt.replace(tzinfo=local_tz)
                match_date = local_dt.astimezone(timezone.utc)
                
                status = 'SCHEDULED'
                if game.get('finished') == 'TRUE':
                    status = 'FINISHED'
                elif game.get('time_elapsed') not in ['notstarted', 'finished']:
                    status = 'LIVE'
                    
                team_a_score = int(game.get('home_score')) if game.get('home_score') else None
                team_b_score = int(game.get('away_score')) if game.get('away_score') else None

                match, created = Match.objects.get_or_create(
                    team_a=team_a,
                    team_b=team_b,
                    date=match_date,
                    defaults={
                        'status': status,
                        'match_round': game.get('group', ''),
                        'team_a_score': team_a_score,
                        'team_b_score': team_b_score,
                    }
                )
                if created:
                    matches_created += 1
            except Team.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Equipo no encontrado para el partido {game.get('id')}"))
            except ValueError:
                self.stdout.write(self.style.WARNING(f"Error de formato de fecha o número en partido {game.get('id')}"))

        self.stdout.write(self.style.SUCCESS(f"Se crearon {matches_created} partidos programados."))
