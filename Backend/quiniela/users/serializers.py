from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializador para el registro de usuarios.
    Permite crear un usuario y aplicar el hash a la contraseña.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        # Usamos create_user para que se hashee la contraseña correctamente
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializador para el perfil público y dashboard.
    Incluye los puntos, balance virtual y avatar.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'points', 'virtual_balance', 'avatar', 'trend')
        read_only_fields = ('points', 'virtual_balance', 'trend')
