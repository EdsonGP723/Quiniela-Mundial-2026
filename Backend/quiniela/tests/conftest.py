import pytest
from rest_framework.test import APIClient

@pytest.fixture(autouse=True)
def timezone_settings(settings):
    """Ensure consistent timezone for tests."""
    settings.TIME_ZONE = 'UTC'

@pytest.fixture
def user(db, django_user_model):
    """Create a basic test user."""
    return django_user_model.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123'
    )

@pytest.fixture
def api_client():
    """Return DRF API client."""
    return APIClient()

@pytest.fixture
def authenticated_api_client(api_client, user):
    """Return authenticated API client."""
    api_client.force_authenticate(user=user)
    return api_client
