from django.contrib import admin
from .models import Team, Match

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'short_name')
    search_fields = ('name', 'short_name')

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'date', 'status', 'team_a_score', 'team_b_score', 'match_round')
    list_filter = ('status', 'match_round', 'date')
    search_fields = ('team_a__name', 'team_b__name')
    list_editable = ('status', 'team_a_score', 'team_b_score')
    date_hierarchy = 'date'
