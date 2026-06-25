import pytest
from unittest.mock import Mock
from decimal import Decimal
from predictions.serializers import PredictionSerializer
from tests.factories import UserFactory, MatchFactory, PredictionFactory

@pytest.mark.django_db
class TestPredictionSerializers:
    """Test suite for predictions app serializers."""

    def _get_context(self, user):
        """Helper to create serializer context with request."""
        request = Mock()
        request.user = user
        return {'request': request}

    def test_prediction_serializer_valid_data(self):
        """Test accepting valid data for a SCHEDULED match with sufficient balance."""
        user = UserFactory(virtual_balance=1000.00)
        match = MatchFactory(status='SCHEDULED', entry_fee=500.00)
        
        data = {
            'match': match.id,
            'team_a_score': 2,
            'team_b_score': 1
        }
        
        serializer = PredictionSerializer(data=data, context=self._get_context(user))
        assert serializer.is_valid(), serializer.errors

    def test_prediction_serializer_rejects_live_match(self):
        """Test rejecting prediction for LIVE match."""
        user = UserFactory(virtual_balance=1000.00)
        match = MatchFactory(status='LIVE')
        
        data = {
            'match': match.id,
            'team_a_score': 2,
            'team_b_score': 1
        }
        
        serializer = PredictionSerializer(data=data, context=self._get_context(user))
        assert not serializer.is_valid()
        assert 'non_field_errors' in serializer.errors
        assert 'No puedes predecir' in str(serializer.errors['non_field_errors'][0])

    def test_prediction_serializer_rejects_finished_match(self):
        """Test rejecting prediction for FINISHED match."""
        user = UserFactory(virtual_balance=1000.00)
        match = MatchFactory(status='FINISHED')
        
        data = {
            'match': match.id,
            'team_a_score': 2,
            'team_b_score': 1
        }
        
        serializer = PredictionSerializer(data=data, context=self._get_context(user))
        assert not serializer.is_valid()
        assert 'non_field_errors' in serializer.errors

    def test_prediction_serializer_rejects_insufficient_balance(self):
        """Test rejecting prediction when user lacks virtual balance."""
        user = UserFactory(virtual_balance=100.00)
        match = MatchFactory(status='SCHEDULED', entry_fee=500.00)
        
        data = {
            'match': match.id,
            'team_a_score': 2,
            'team_b_score': 1
        }
        
        serializer = PredictionSerializer(data=data, context=self._get_context(user))
        assert not serializer.is_valid()
        assert 'non_field_errors' in serializer.errors
        assert 'Saldo virtual insuficiente' in str(serializer.errors['non_field_errors'][0])

    def test_prediction_serializer_read_only_fields(self):
        """Test that is_winner and earnings are read-only."""
        user = UserFactory(virtual_balance=1000.00)
        prediction = PredictionFactory(user=user, is_winner=None, earnings=0)
        
        data = {
            'team_a_score': 3,
            'is_winner': True,
            'earnings': '1000.00'
        }
        
        # Updating an existing instance doesn't trigger the balance check
        serializer = PredictionSerializer(prediction, data=data, partial=True, context=self._get_context(user))
        assert serializer.is_valid(), serializer.errors
        updated_pred = serializer.save()
        
        assert updated_pred.team_a_score == 3
        assert updated_pred.is_winner is None
        assert Decimal(updated_pred.earnings) == Decimal('0.00')
