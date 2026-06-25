import pytest
from matches.serializers import TeamSerializer, MatchSerializer
from tests.factories import TeamFactory, MatchFactory

@pytest.mark.django_db
class TestMatchesSerializers:
    """Test suite for matches app serializers."""

    def test_team_serializer(self):
        """Test TeamSerializer serializes all required fields."""
        team = TeamFactory(name='Brazil', short_name='BRA', flag_url='http://example.com/brazil.png')
        serializer = TeamSerializer(team)
        
        data = serializer.data
        assert set(data.keys()) == {'id', 'name', 'short_name', 'flag_url'}
        assert data['name'] == 'Brazil'
        assert data['short_name'] == 'BRA'
        assert data['flag_url'] == 'http://example.com/brazil.png'

    def test_match_serializer_nested_teams(self):
        """Test MatchSerializer nests full team information."""
        team_a = TeamFactory(name='Mexico', short_name='MEX')
        team_b = TeamFactory(name='Argentina', short_name='ARG')
        match = MatchFactory(team_a=team_a, team_b=team_b)
        
        serializer = MatchSerializer(match)
        data = serializer.data
        
        # Verify team_a is nested
        assert 'team_a' in data
        assert data['team_a']['name'] == 'Mexico'
        assert data['team_a']['short_name'] == 'MEX'
        
        # Verify team_b is nested
        assert 'team_b' in data
        assert data['team_b']['name'] == 'Argentina'
        assert data['team_b']['short_name'] == 'ARG'

    def test_match_serializer_all_fields(self):
        """Test MatchSerializer includes all expected fields."""
        match = MatchFactory(team_a_score=1, team_b_score=2)
        serializer = MatchSerializer(match)
        
        data = serializer.data
        expected_fields = {
            'id', 'team_a', 'team_b', 'date', 'status', 
            'team_a_score', 'team_b_score', 'entry_fee', 'prize_pool'
        }
        assert set(data.keys()) == expected_fields
        assert data['team_a_score'] == 1
        assert data['team_b_score'] == 2
