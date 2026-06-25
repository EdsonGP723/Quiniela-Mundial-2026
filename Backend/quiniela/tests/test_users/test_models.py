import pytest
from django.contrib.auth import get_user_model
from decimal import Decimal
from tests.factories import UserFactory

User = get_user_model()

@pytest.mark.django_db
class TestUserModel:
    """Test suite for the custom User model."""

    def test_create_user_with_defaults(self):
        """Test creating a regular user has correct default values."""
        user = User.objects.create_user(
            username='johndoe',
            email='john@example.com',
            password='password123'
        )
        assert user.points == 0
        assert user.virtual_balance == Decimal('0.00')
        assert user.trend == 'horizontal_rule'
        assert not user.is_staff
        assert not user.is_superuser

    def test_user_str(self):
        """Test string representation of User."""
        user = UserFactory(username='testuser1')
        assert str(user) == 'testuser1'

    def test_user_custom_fields(self):
        """Test assigning custom fields."""
        user = UserFactory(
            points=150,
            virtual_balance=Decimal('250.50'),
            avatar='http://example.com/avatar.png'
        )
        assert user.points == 150
        assert user.virtual_balance == Decimal('250.50')
        assert user.avatar == 'http://example.com/avatar.png'

    def test_user_trend_choices(self):
        """Test the trend choices validation."""
        user = UserFactory(trend='trending_up')
        assert user.trend == 'trending_up'
        
        user.trend = 'trending_down'
        user.save()
        assert user.trend == 'trending_down'

    def test_create_superuser(self):
        """Test superuser creation."""
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='adminpassword'
        )
        assert admin.is_staff is True
        assert admin.is_superuser is True
