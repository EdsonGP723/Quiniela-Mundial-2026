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

    def create(self, request, *args, **kwargs):
        from rest_framework.response import Response
        match_id = request.data.get('match')
        user = request.user
        
        try:
            # Si ya existe una predicción para este partido, la actualizamos
            prediction = Prediction.objects.get(user=user, match_id=match_id)
            serializer = self.get_serializer(prediction, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except Prediction.DoesNotExist:
            # Flujo normal de creación
            return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        with transaction.atomic():
            user = self.request.user
            match = serializer.validated_data['match']
            
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
