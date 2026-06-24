from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    Modelo de Usuario Personalizado.
    Extiende de AbstractUser para incluir campos de puntos y saldo virtual.
    """
    # Puntos acumulados en el ranking global
    points = models.IntegerField(default=0, help_text="Puntos obtenidos por predicciones correctas")
    
    # Saldo virtual para apostar (no es dinero real)
    virtual_balance = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0.00, 
        help_text="Saldo virtual para uso dentro de la plataforma"
    )
    
    # Avatar del usuario
    avatar = models.URLField(max_length=500, blank=True, null=True, help_text="URL de la imagen de avatar")
    
    # Tendencia en el ranking
    TREND_CHOICES = [
        ('trending_up', 'Sube'),
        ('trending_down', 'Baja'),
        ('horizontal_rule', 'Se mantiene'),
    ]
    trend = models.CharField(max_length=20, choices=TREND_CHOICES, default='horizontal_rule', help_text="Tendencia en el ranking global")

    def __str__(self):
        return self.username
