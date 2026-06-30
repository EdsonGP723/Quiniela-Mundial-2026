import os
import django
import sys
from zoneinfo import ZoneInfo
from datetime import datetime, timezone

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "quiniela.settings")
django.setup()

from matches.models import Match, Team
from matches.api_client import WorldCup26Client

STADIUM_TZ = {
    "1": "America/Mexico_City",
    "2": "America/Mexico_City",
    "3": "America/Monterrey",
    "4": "America/Chicago",
    "5": "America/Chicago",
    "6": "America/Chicago",
    "7": "America/New_York",
    "8": "America/New_York",
    "9": "America/New_York",
    "10": "America/New_York",
    "11": "America/New_York",
    "12": "America/Toronto",
    "13": "America/Vancouver",
    "14": "America/Los_Angeles",
    "15": "America/Los_Angeles",
    "16": "America/Los_Angeles",
}

client = WorldCup26Client()
games = client.get_games()

fixed = 0
for game in games:
    home_name = game.get('home_team_name_en')
    away_name = game.get('away_team_name_en')
    date_str = game.get('local_date')
    stadium_id = str(game.get('stadium_id'))
    
    if not home_name or not away_name or not date_str or stadium_id not in STADIUM_TZ:
        continue
        
    try:
        team_a = Team.objects.get(name=home_name)
        team_b = Team.objects.get(name=away_name)
        match = Match.objects.filter(team_a=team_a, team_b=team_b).first()
        if match:
            # Parse local date
            naive_dt = datetime.strptime(date_str, "%m/%d/%Y %H:%M")
            # Localize it to the stadium's timezone
            local_tz = ZoneInfo(STADIUM_TZ[stadium_id])
            local_dt = naive_dt.replace(tzinfo=local_tz)
            # Convert to UTC
            utc_dt = local_dt.astimezone(timezone.utc)
            
            # Save
            match.date = utc_dt
            match.save()
            fixed += 1
    except Exception as e:
        print(f"Error with {home_name} vs {away_name}: {e}")

print(f"Fixed {fixed} matches.")
