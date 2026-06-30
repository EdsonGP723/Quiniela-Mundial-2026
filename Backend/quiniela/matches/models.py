from django.db import models

class Team(models.Model):
    """
    Modelo para los equipos participantes en el torneo.
    """
    name = models.CharField(max_length=100, help_text="Nombre del equipo (Ej: México)")
    short_name = models.CharField(max_length=3, help_text="Abreviatura de 3 letras (Ej: MEX)")
    flag_url = models.URLField(max_length=500, blank=True, null=True, help_text="URL de la bandera del equipo")

    def __str__(self):
        return self.name

class Match(models.Model):
    """
    Modelo para los partidos programados.
    Contiene la fecha, equipos, marcador y estado del partido, así como la bolsa de ganancias.
    """
    STATUS_CHOICES = [
        ('SCHEDULED', 'Programado'),
        ('LIVE', 'En Vivo'),
        ('FINISHED', 'Finalizado'),
    ]

    team_a = models.ForeignKey(Team, related_name='matches_as_team_a', on_delete=models.CASCADE)
    team_b = models.ForeignKey(Team, related_name='matches_as_team_b', on_delete=models.CASCADE)
    
    date = models.DateTimeField(help_text="Fecha y hora de inicio del partido")
    match_round = models.CharField(max_length=20, blank=True, help_text="Grupo o ronda (A, B, ..., R32, QF, SF, FINAL)")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='SCHEDULED')
    
    # Marcador puede ser nulo hasta que inicie o termine el partido
    team_a_score = models.IntegerField(null=True, blank=True, help_text="Marcador del equipo A")
    team_b_score = models.IntegerField(null=True, blank=True, help_text="Marcador del equipo B")
    
    # Costo por apostar en este partido y bolsa acumulada
    entry_fee = models.DecimalField(max_digits=10, decimal_places=2, default=100.00, help_text="Costo en saldo virtual para predecir")
    prize_pool = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, help_text="Bolsa acumulada virtual")

    class Meta:
        verbose_name_plural = "Matches"
        ordering = ['date']

    def __str__(self):
        return f"{self.team_a.short_name} vs {self.team_b.short_name} - {self.date.strftime('%Y-%m-%d %H:%M')}"
