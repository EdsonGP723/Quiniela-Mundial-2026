import requests

class WorldCup26Client:
    """
    Cliente para comunicarse con la API gratuita de WorldCup26.ir.
    """
    BASE_URL = "https://worldcup26.ir"

    def _get(self, endpoint):
        """Método base para peticiones GET."""
        url = f"{self.BASE_URL}/{endpoint}"
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error llamando a WorldCup26.ir: {e}")
            return {}

    def get_teams(self):
        """
        Obtiene los equipos de la Copa del Mundo 2026.
        """
        data = self._get("get/teams")
        return data.get('teams', [])

    def get_games(self):
        """
        Obtiene todos los partidos (fixtures) del mundial.
        """
        data = self._get("get/games")
        return data.get('games', [])
