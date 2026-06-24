from rest_framework import serializers
from .models import Prediction
from matches.serializers import MatchSerializer
from matches.models import Match

class PredictionSerializer(serializers.ModelSerializer):
    """
    Serializador para las predicciones.
    Al leer retorna el partido anidado; al escribir requiere solo el ID del partido.
    """
    match_detail = MatchSerializer(source='match', read_only=True)
    
    class Meta:
        model = Prediction
        fields = ('id', 'match', 'match_detail', 'team_a_score', 'team_b_score', 'is_winner', 'earnings')
        read_only_fields = ('is_winner', 'earnings')

    def validate(self, data):
        """
        Valida que el partido aún no haya comenzado (status SCHEDULED).
        También resta el entry_fee del saldo virtual del usuario (se hará en la vista o el save).
        """
        match = data.get('match')
        if match and match.status != 'SCHEDULED':
            raise serializers.ValidationError("No puedes predecir un partido que ya ha comenzado o finalizado.")
        
        # Validación de saldo en la creación
        user = self.context['request'].user
        if self.instance is None:  # Solo al crear
            if user.virtual_balance < match.entry_fee:
                raise serializers.ValidationError("Saldo virtual insuficiente para apostar en este partido.")
                
        return data

class MatchEarningsSerializer(serializers.ModelSerializer):
    """
    Serializador para la vista de Resultados y Ganancias de un partido.
    """
    class Meta:
        model = Prediction
        fields = ('user', 'team_a_score', 'team_b_score', 'is_winner', 'earnings')
        depth = 1 # Para incluir username básico
