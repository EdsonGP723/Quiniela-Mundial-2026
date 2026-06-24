from rest_framework import generics, permissions, serializers
from django.db import transaction
from .models import Prediction
from .serializers import PredictionSerializer, MatchEarningsSerializer
from matches.models import Match

class MyPredictionsView(generics.ListCreateAPIView):
    """
    Lista las predicciones del usuario autenticado y permite crear nuevas.
    """
    serializer_class = PredictionSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Prediction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Descontamos el saldo virtual al hacer la predicción
        with transaction.atomic():
            user = self.request.user
            match = serializer.validated_data['match']
            
            # Restamos del balance virtual y añadimos al prize_pool del partido
            user.virtual_balance -= match.entry_fee
            user.save()
            
            match.prize_pool += match.entry_fee
            match.save()
            
            serializer.save(user=user)

class MatchEarningsView(generics.ListAPIView):
    """
    Lista todas las predicciones para un partido específico.
    Útil para la vista de Resultados y Ganancias.
    """
    serializer_class = MatchEarningsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        return Prediction.objects.filter(match_id=match_id).order_by('-earnings', '-is_winner')
