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
            
            # Identificamos a los ganadores y asignamos puntos
            for pred in predictions:
                # Determinamos resultado del partido real
                real_result = 'A' if instance.team_a_score > instance.team_b_score else ('B' if instance.team_b_score > instance.team_a_score else 'DRAW')
                # Determinamos resultado de la predicción
                pred_result = 'A' if pred.team_a_score > pred.team_b_score else ('B' if pred.team_b_score > pred.team_a_score else 'DRAW')
                
                if pred.team_a_score == instance.team_a_score and pred.team_b_score == instance.team_b_score:
                    pred.is_winner = True
                    pred.points_earned = 3
                    winners.append(pred)
                elif real_result == pred_result:
                    pred.is_winner = False
                    pred.points_earned = 1
                else:
                    pred.is_winner = False
                    pred.points_earned = 0
                    
                pred.earnings = 0
                pred.save()
                
                # Actualizamos puntos del usuario inmediatamente
                user = pred.user
                user.points += pred.points_earned
                user.save()

            if winners:
                from decimal import Decimal
                # Dividimos la bolsa equitativamente
                prize_per_winner = Decimal(str(instance.prize_pool)) / Decimal(len(winners))
                
                for winner in winners:
                    winner.earnings = prize_per_winner
                    winner.save()
                    
                    # Actualizamos el registro contable de ganancias (virtual_balance)
                    user = winner.user
                    user.virtual_balance += prize_per_winner
                    user.save()
                    
            # Opcional: podríamos vaciar el prize_pool del partido o marcarlo como 'repartido'
