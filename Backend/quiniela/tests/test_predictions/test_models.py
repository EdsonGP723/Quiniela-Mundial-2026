import pytest
from django.db.utils import IntegrityError
from decimal import Decimal
from tests.factories import UserFactory, MatchFactory, PredictionFactory
from predictions.models import Prediction

@pytest.mark.django_db
class TestPredictionModel:
    """Test suite for the Prediction model."""

    def test_prediction_creation(self):
        """Test basic prediction creation."""
        user = UserFactory()
        match = MatchFactory()
        prediction = PredictionFactory(user=user, match=match, team_a_score=2, team_b_score=1)
        
        assert prediction.id is not None
        assert prediction.user == user
        assert prediction.match == match
        assert prediction.team_a_score == 2
        assert prediction.team_b_score == 1

    def test_prediction_str(self):
        """Test string representation of Prediction."""
        user = UserFactory(username='testuser')
        match = MatchFactory(team_a__short_name='MEX', team_b__short_name='ARG')
        prediction = PredictionFactory(user=user, match=match, team_a_score=1, team_b_score=1)
        
        expected_str = f"testuser - {match} (1-1)"
        assert str(prediction) == expected_str

    def test_prediction_unique_together(self):
        """Test a user can only have one prediction per match."""
        user = UserFactory()
        match = MatchFactory()
        
        # First prediction should succeed
        PredictionFactory(user=user, match=match)
        
        # Second prediction for same user and match should fail
        with pytest.raises(IntegrityError):
            PredictionFactory(user=user, match=match)

    def test_prediction_default_values(self):
        """Test prediction has correct default values."""
        prediction = PredictionFactory()
        assert prediction.is_winner is None
        assert prediction.earnings == Decimal('0.00')

    def test_prediction_ordering(self):
        """Test predictions are ordered by created_at descending."""
        pred1 = PredictionFactory()
        pred2 = PredictionFactory()
        pred3 = PredictionFactory()
        
        predictions = list(Prediction.objects.all())
        # The default ordering is ['-created_at']
        assert predictions == [pred3, pred2, pred1]
