import pytest
from decimal import Decimal
from tests.factories import UserFactory, MatchFactory, PredictionFactory
from predictions.models import Prediction
from matches.models import Match

@pytest.mark.django_db
class TestCalculateEarningsSignal:
    """Test suite for the calculate_earnings_on_match_finish signal."""

    def test_signal_marks_winner_correctly(self):
        """Test the signal correctly identifies exact score match."""
        user = UserFactory(points=0, virtual_balance=0)
        match = MatchFactory(status='LIVE', prize_pool=1000.00)
        pred = PredictionFactory(user=user, match=match, team_a_score=2, team_b_score=1)
        
        # Trigger the signal by finishing the match
        match.status = 'FINISHED'
        match.team_a_score = 2
        match.team_b_score = 1
        match.save()
        
        pred.refresh_from_db()
        assert pred.is_winner is True

    def test_signal_marks_losers_correctly(self):
        """Test the signal correctly identifies losers."""
        user = UserFactory()
        match = MatchFactory(status='LIVE', prize_pool=1000.00)
        # Prediction doesn't match exact score
        pred = PredictionFactory(user=user, match=match, team_a_score=1, team_b_score=1)
        
        match.status = 'FINISHED'
        match.team_a_score = 2
        match.team_b_score = 1
        match.save()
        
        pred.refresh_from_db()
        assert pred.is_winner is False
        assert pred.earnings == 0

    def test_signal_splits_prize_pool(self):
        """Test prize pool is divided correctly between multiple winners."""
        user1 = UserFactory()
        user2 = UserFactory()
        match = MatchFactory(status='LIVE', prize_pool=1000.00)
        
        # Both predict correctly
        pred1 = PredictionFactory(user=user1, match=match, team_a_score=2, team_b_score=1)
        pred2 = PredictionFactory(user=user2, match=match, team_a_score=2, team_b_score=1)
        
        match.status = 'FINISHED'
        match.team_a_score = 2
        match.team_b_score = 1
        match.save()
        
        pred1.refresh_from_db()
        pred2.refresh_from_db()
        
        assert pred1.earnings == Decimal('500.00')
        assert pred2.earnings == Decimal('500.00')

    def test_signal_updates_user_balance_and_points(self):
        """Test user balance and points are updated upon winning."""
        user = UserFactory(points=50, virtual_balance=100.00)
        match = MatchFactory(status='LIVE', prize_pool=1000.00)
        PredictionFactory(user=user, match=match, team_a_score=2, team_b_score=1)
        
        match.status = 'FINISHED'
        match.team_a_score = 2
        match.team_b_score = 1
        match.save()
        
        user.refresh_from_db()
        # 100 base + 1000 prize
        assert user.virtual_balance == Decimal('1100.00')
        # 50 base + 100 reward
        assert user.points == 150

    def test_signal_no_winners(self):
        """Test scenario where no one wins."""
        user1 = UserFactory(virtual_balance=100)
        match = MatchFactory(status='LIVE', prize_pool=1000.00)
        pred1 = PredictionFactory(user=user1, match=match, team_a_score=0, team_b_score=0)
        
        match.status = 'FINISHED'
        match.team_a_score = 2
        match.team_b_score = 1
        match.save()
        
        pred1.refresh_from_db()
        user1.refresh_from_db()
        
        assert pred1.is_winner is False
        assert pred1.earnings == 0
        assert user1.virtual_balance == 100  # Unchanged

    def test_signal_does_not_trigger_on_scheduled(self):
        """Test signal doesn't do anything if match is not finished."""
        match = MatchFactory(status='SCHEDULED', prize_pool=1000.00)
        pred = PredictionFactory(match=match, team_a_score=2, team_b_score=1)
        
        # Save without changing status to FINISHED
        match.team_a_score = 2
        match.team_b_score = 1
        match.save()
        
        pred.refresh_from_db()
        assert pred.is_winner is None
        assert pred.earnings == 0
