from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import transaction
from matches.models import Match
from .models import Prediction

@receiver(post_save, sender=Match)
def calculate_earnings_on_match_finish(sender, instance, **kwargs):
    """
    Signal que se ejecuta cuando se guarda un partido.
    Si el partido cambia a estado 'FINISHED' y tiene marcadores, 
    calcula quiénes acertaron, divide la bolsa y actualiza sus puntos y saldo.
    """
    # Verificamos que esté finalizado y tenga marcadores válidos
    if instance.status == 'FINISHED' and instance.team_a_score is not None and instance.team_b_score is not None:
        
        # Para evitar que se calcule más de una vez, podríamos tener una bandera en el modelo, 
        # pero por simplicidad de la prueba, asumiremos que solo se pone en FINISHED una vez.
        
        with transaction.atomic():
            predictions = Prediction.objects.filter(match=instance)
            
            winners = []
            
            # Identificamos a los ganadores
            for pred in predictions:
                if pred.team_a_score == instance.team_a_score and pred.team_b_score == instance.team_b_score:
                    pred.is_winner = True
                    winners.append(pred)
                else:
                    pred.is_winner = False
                    pred.earnings = 0
                pred.save()

            if winners:
                # Dividimos la bolsa equitativamente
                prize_per_winner = instance.prize_pool / len(winners)
                
                for winner in winners:
                    winner.earnings = prize_per_winner
                    winner.save()
                    
                    # Actualizamos al usuario
                    user = winner.user
                    user.virtual_balance += prize_per_winner
                    user.points += 100 # Arbitrario: 100 puntos por acertar
                    user.save()
                    
            # Opcional: podríamos vaciar el prize_pool del partido o marcarlo como 'repartido'
