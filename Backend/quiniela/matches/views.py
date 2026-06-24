from rest_framework import generics, permissions
from .models import Match
from .serializers import MatchSerializer

class MatchListView(generics.ListAPIView):
    """
    Vista para listar todos los partidos, ordenados por fecha.
    Requiere autenticación.
    """
    queryset = Match.objects.all().order_by('date')
    serializer_class = MatchSerializer
    permission_classes = (permissions.IsAuthenticated,)

class MatchDetailView(generics.RetrieveAPIView):
    """
    Vista para obtener los detalles de un partido en específico.
    """
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = (permissions.IsAuthenticated,)
