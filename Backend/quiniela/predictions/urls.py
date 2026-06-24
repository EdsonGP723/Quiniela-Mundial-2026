from django.urls import path
from .views import MyPredictionsView, MatchEarningsView

urlpatterns = [
    path('mine/', MyPredictionsView.as_view(), name='my_predictions'),
    path('match/<int:match_id>/', MatchEarningsView.as_view(), name='match_earnings'),
]
