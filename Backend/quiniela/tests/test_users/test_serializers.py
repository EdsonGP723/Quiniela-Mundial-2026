import pytest
from users.serializers import UserSerializer, ProfileSerializer
from tests.factories import UserFactory

@pytest.mark.django_db
class TestUserSerializers:
    """Test suite for users app serializers."""

    def test_user_serializer_creates_user(self):
        """Test UserSerializer correctly creates a user and hashes password."""
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'securepassword123',
            'first_name': 'New',
            'last_name': 'User'
        }
        
        serializer = UserSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        user = serializer.save()
        
        assert user.username == 'newuser'
        assert user.check_password('securepassword123')
        assert user.email == 'newuser@example.com'

    def test_user_serializer_password_write_only(self):
        """Test that password is not included in serialized output."""
        user = UserFactory()
        serializer = UserSerializer(user)
        assert 'password' not in serializer.data

    def test_profile_serializer_read_only_fields(self):
        """Test that points, virtual_balance, and trend are read-only in ProfileSerializer."""
        user = UserFactory(points=100)
        
        data = {
            'points': 500,  # Intentar modificar campo read-only
            'virtual_balance': '1000.00',
            'trend': 'trending_up',
            'first_name': 'Updated'
        }
        
        serializer = ProfileSerializer(user, data=data, partial=True)
        assert serializer.is_valid(), serializer.errors
        updated_user = serializer.save()
        
        # first_name should update, others shouldn't
        assert updated_user.first_name == 'Updated'
        assert updated_user.points == 100
        from decimal import Decimal
        assert Decimal(updated_user.virtual_balance) == Decimal('0.00')  # Value from factory default
        assert updated_user.trend == 'horizontal_rule' # Value from factory default
