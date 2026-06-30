from django.db import models
from django.conf import settings
from matches.models import Match

class Prediction(models.Model):
    """
    Modelo para almacenar los pronósticos de los usuarios.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='predictions', on_delete=models.CASCADE)
    match = models.ForeignKey(Match, related_name='predictions', on_delete=models.CASCADE)
    
    team_a_score = models.IntegerField(help_text="Pronóstico para el equipo A")
    team_b_score = models.IntegerField(help_text="Pronóstico para el equipo B")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Estos campos se actualizan mediante signals cuando el partido finaliza
    is_winner = models.BooleanField(null=True, blank=True, help_text="¿Acertó el marcador exacto?")
    earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="Ganancia obtenida en este partido")
    points_earned = models.IntegerField(null=True, blank=True, help_text="Puntos ganados en esta predicción")

    class Meta:
        # Un usuario solo puede tener una predicción por partido
        unique_together = ('user', 'match')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.match} ({self.team_a_score}-{self.team_b_score})"
