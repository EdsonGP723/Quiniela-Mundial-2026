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

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class MatchDetailView(generics.RetrieveAPIView):
    """
    Vista para obtener los detalles de un partido en específico.
    """
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = (permissions.IsAuthenticated,)

class MatchUpdateScoreView(APIView):
    """
    Endpoint para que un administrador actualice el marcador de un partido manualmente.
    Fallback en caso de que falle la API de WorldCup26.
    """
    permission_classes = (permissions.IsAdminUser,)

    def put(self, request, pk):
        try:
            match = Match.objects.get(pk=pk)
        except Match.DoesNotExist:
            return Response({'error': 'Partido no encontrado'}, status=status.HTTP_404_NOT_FOUND)
            
        team_a_score = request.data.get('team_a_score')
        team_b_score = request.data.get('team_b_score')
        match_status = request.data.get('status')
        
        if team_a_score is not None:
            match.team_a_score = team_a_score
        if team_b_score is not None:
            match.team_b_score = team_b_score
        if match_status:
            match.status = match_status
            
        match.save()
        return Response(MatchSerializer(match).data)

from django.core.management import call_command
from io import StringIO
import os

class WebhookSyncMatchesView(APIView):
    """
    Webhook para ser llamado por cron-job.org u otro servicio externo.
    Mantiene activo el servidor de Render y ejecuta el smart_update.
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        secret = request.query_params.get('secret')
        expected_secret = os.getenv('CRON_SECRET', 'default-cron-secret-change-me')
        
        if secret != expected_secret:
            return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)
            
        out = StringIO()
        try:
            call_command('smart_update', stdout=out)
            output = out.getvalue()
            return Response({'status': 'success', 'output': output})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
