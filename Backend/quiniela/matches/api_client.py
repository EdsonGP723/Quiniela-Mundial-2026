import os
import requests
from django.conf import settings
from datetime import datetime
import pytz

class APIFootballClient:
    """
    Cliente para comunicarse con la API de API-Football (RapidAPI).
    """
    BASE_URL = "https://v3.football.api-sports.io"
    WORLD_CUP_LEAGUE_ID = 1 # ID de la Copa del Mundo en API-Football
    SEASON = 2026

    def __init__(self):
        self.api_key = settings.API_FOOTBALL_KEY
        self.headers = {
            'x-apisports-key': self.api_key,
        }

    def _get(self, endpoint, params=None):
        """Método base para peticiones GET."""
        if not self.api_key or self.api_key == 'tu_clave_de_rapidapi_aqui':
            print("ADVERTENCIA: API_FOOTBALL_KEY no está configurada o es la por defecto.")
            return {}

        url = f"{self.BASE_URL}/{endpoint}"
        try:
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error llamando a API-Football: {e}")
            return {}

    def get_teams(self):
        """
        Obtiene los equipos de la Copa del Mundo 2026.
        """
        params = {
            'league': self.WORLD_CUP_LEAGUE_ID,
            'season': self.SEASON
        }
        data = self._get("teams", params=params)
        return data.get('response', [])

    def get_fixtures(self, date=None, status=None):
        """
        Obtiene los partidos (fixtures) del mundial.
        Si se especifica date (YYYY-MM-DD), trae los de ese día.
        """
        params = {
            'league': self.WORLD_CUP_LEAGUE_ID,
            'season': self.SEASON
        }
        if date:
            params['date'] = date
        if status:
            params['status'] = status
            
        data = self._get("fixtures", params=params)
        return data.get('response', [])
