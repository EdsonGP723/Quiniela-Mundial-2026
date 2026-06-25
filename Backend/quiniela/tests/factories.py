import factory
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from matches.models import Team, Match
from predictions.models import Prediction

User = get_user_model()

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user_{n}")
    email = factory.LazyAttribute(lambda obj: f"{obj.username}@example.com")
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    password = factory.PostGenerationMethodCall('set_password', 'testpass123')
    
    # Custom fields defaults based on User model
    points = 0
    virtual_balance = 0.00
    trend = 'horizontal_rule'

class TeamFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Team

    name = factory.Faker('country')
    short_name = factory.LazyAttribute(lambda obj: obj.name[:3].upper())
    flag_url = factory.Faker('image_url')

class MatchFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Match

    team_a = factory.SubFactory(TeamFactory)
    team_b = factory.SubFactory(TeamFactory)
    
    # Defaults to a match in the future (SCHEDULED)
    date = factory.LazyFunction(lambda: timezone.now() + timedelta(days=1))
    status = 'SCHEDULED'
    
    team_a_score = None
    team_b_score = None
    
    entry_fee = 500.00
    prize_pool = 0.00

class PredictionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Prediction

    user = factory.SubFactory(UserFactory)
    match = factory.SubFactory(MatchFactory)
    
    team_a_score = factory.Faker('random_int', min=0, max=5)
    team_b_score = factory.Faker('random_int', min=0, max=5)
