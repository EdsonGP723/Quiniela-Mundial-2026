from rest_framework import generics, permissions
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, ProfileSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """
    Vista para registrar un nuevo usuario.
    Es pública (no requiere autenticación).
    """
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Vista para obtener y actualizar el perfil del usuario autenticado.
    Requiere token JWT.
    """
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        # Siempre retornamos el usuario que hace la petición
        return self.request.user

class StandingsView(generics.ListAPIView):
    """
    Vista para el Ranking Global.
    Retorna la lista de usuarios ordenada por puntos de mayor a menor.
    """
    serializer_class = ProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        # Obtenemos usuarios ordenados por puntos descendente
        return User.objects.all().order_by('-points', 'username')
