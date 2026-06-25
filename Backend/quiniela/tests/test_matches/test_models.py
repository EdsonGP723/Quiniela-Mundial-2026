import pytest
from decimal import Decimal
from django.utils import timezone
from datetime import timedelta
from tests.factories import TeamFactory, MatchFactory
from matches.models import Match

@pytest.mark.django_db
class TestTeamModel:
    """Test suite for the Team model."""

    def test_team_creation(self):
        """Test basic team creation."""
        team = TeamFactory(name='Mexico', short_name='MEX')
        assert team.id is not None
        assert team.name == 'Mexico'
        assert team.short_name == 'MEX'

    def test_team_str(self):
        """Test string representation of Team."""
        team = TeamFactory(name='Argentina')
        assert str(team) == 'Argentina'

@pytest.mark.django_db
class TestMatchModel:
    """Test suite for the Match model."""

    def test_match_creation(self):
        """Test basic match creation with two teams."""
        team_a = TeamFactory(short_name='MEX')
        team_b = TeamFactory(short_name='ARG')
        match = MatchFactory(team_a=team_a, team_b=team_b)
        
        assert match.id is not None
        assert match.team_a == team_a
        assert match.team_b == team_b

    def test_match_str(self):
        """Test string representation of Match."""
        team_a = TeamFactory(short_name='MEX')
        team_b = TeamFactory(short_name='ARG')
        date = timezone.now().replace(year=2026, month=6, day=15, hour=18, minute=0, second=0, microsecond=0)
        match = MatchFactory(team_a=team_a, team_b=team_b, date=date)
        
        expected_str = f"MEX vs ARG - {date.strftime('%Y-%m-%d %H:%M')}"
        assert str(match) == expected_str

    def test_match_default_values(self):
        """Test match has correct default values when created."""
        match = MatchFactory()
        assert match.status == 'SCHEDULED'
        assert match.entry_fee == Decimal('500.00')
        assert match.prize_pool == Decimal('0.00')

    def test_match_scores_nullable(self):
        """Test match scores can be null (before/during match)."""
        match = MatchFactory(team_a_score=None, team_b_score=None)
        assert match.team_a_score is None
        assert match.team_b_score is None

    def test_match_ordering(self):
        """Test that matches are ordered by date ascending."""
        now = timezone.now()
        match3 = MatchFactory(date=now + timedelta(days=3))
        match1 = MatchFactory(date=now + timedelta(days=1))
        match2 = MatchFactory(date=now + timedelta(days=2))
        
        matches = list(Match.objects.all())
        assert matches == [match1, match2, match3]

    def test_match_status_choices(self):
        """Test the status choices."""
        match = MatchFactory(status='SCHEDULED')
        assert match.status == 'SCHEDULED'
        
        match.status = 'LIVE'
        match.save()
        assert match.status == 'LIVE'
        
        match.status = 'FINISHED'
        match.save()
        assert match.status == 'FINISHED'
