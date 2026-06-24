from rest_framework import serializers
from .models import Team, Match

class TeamSerializer(serializers.ModelSerializer):
    """
    Serializador para listar detalles básicos de un equipo.
    """
    class Meta:
        model = Team
        fields = ('id', 'name', 'short_name', 'flag_url')

class MatchSerializer(serializers.ModelSerializer):
    """
    Serializador para partidos, anidando la información de los equipos.
    Útil para mostrar en la lista de predicciones.
    """
    team_a = TeamSerializer(read_only=True)
    team_b = TeamSerializer(read_only=True)

    class Meta:
        model = Match
        fields = (
            'id', 'team_a', 'team_b', 'date', 'status', 
            'team_a_score', 'team_b_score', 'entry_fee', 'prize_pool'
        )
