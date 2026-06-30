from django.urls import path
from .views import MatchListView, MatchDetailView, MatchUpdateScoreView, WebhookSyncMatchesView

urlpatterns = [
    path('', MatchListView.as_view(), name='match_list'),
    path('<int:pk>/', MatchDetailView.as_view(), name='match_detail'),
    path('<int:pk>/update-score/', MatchUpdateScoreView.as_view(), name='match_update_score'),
    path('webhook/sync/', WebhookSyncMatchesView.as_view(), name='webhook_sync'),
]
