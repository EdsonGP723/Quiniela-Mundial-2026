import json
from django.core.management.base import BaseCommand
from matches.models import Team, Match
from datetime import datetime
from django.utils.timezone import make_aware
import os

class Command(BaseCommand):
    help = 'Carga equipos y partidos manualmente desde un archivo JSON (fallback)'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Ruta al archivo JSON a cargar')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'El archivo {file_path} no existe.'))
            return
            
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                self.stdout.write(self.style.ERROR('Formato de JSON inválido.'))
                return
                
        # Cargar equipos
        teams_data = data.get('teams', [])
        teams_created = 0
        for t in teams_data:
            team, created = Team.objects.get_or_create(
                name=t.get('name'),
                defaults={
                    'short_name': t.get('short_name', t.get('name')[:3].upper()),
                    'flag_url': t.get('flag_url', '')
                }
            )
            if created:
                teams_created += 1
                
        self.stdout.write(self.style.SUCCESS(f'Equipos creados/actualizados: {teams_created}'))
        
        # Cargar partidos
        matches_data = data.get('matches', [])
        matches_created = 0
        for m in matches_data:
            try:
                team_a = Team.objects.get(name=m.get('team_a'))
                team_b = Team.objects.get(name=m.get('team_b'))
                date_str = m.get('date')
                match_date = make_aware(datetime.fromisoformat(date_str))
                
                match, created = Match.objects.get_or_create(
                    team_a=team_a,
                    team_b=team_b,
                    date=match_date,
                    defaults={
                        'status': m.get('status', 'SCHEDULED'),
                        'match_round': m.get('match_round', ''),
                        'team_a_score': m.get('team_a_score'),
                        'team_b_score': m.get('team_b_score'),
                    }
                )
                if created:
                    matches_created += 1
            except Team.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Equipo no encontrado para el partido entre {m.get('team_a')} y {m.get('team_b')}"))
                
        self.stdout.write(self.style.SUCCESS(f'Partidos creados: {matches_created}'))
