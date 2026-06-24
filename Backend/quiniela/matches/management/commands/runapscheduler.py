import logging
from django.conf import settings
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django.core.management.base import BaseCommand
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from django_apscheduler import util
from matches.management.commands.smart_update import Command as SmartUpdateCommand

logger = logging.getLogger(__name__)

def update_matches_job():
    """Llama a nuestro comando inteligente de actualización."""
    cmd = SmartUpdateCommand()
    cmd.handle()

@util.close_old_connections
def delete_old_job_executions(max_age=604_800):
    """Borra ejecuciones de jobs mayores a 1 semana."""
    DjangoJobExecution.objects.delete_old_job_executions(max_age)

class Command(BaseCommand):
    help = "Inicia APScheduler para correr trabajos en segundo plano."

    def handle(self, *args, **options):
        scheduler = BlockingScheduler(timezone=settings.TIME_ZONE)
        scheduler.add_jobstore(DjangoJobStore(), "default")

        # Configurar para que corra cada 10 minutos
        scheduler.add_job(
            update_matches_job,
            trigger=CronTrigger(minute="*/10"),
            id="update_matches_job",
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Añadido job 'update_matches_job' (cada 10 minutos).")

        # Tarea de limpieza semanal
        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(day_of_week="mon", hour="00", minute="00"),
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Añadido job de limpieza de base de datos semanal.")

        try:
            logger.info("Iniciando scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            logger.info("Deteniendo scheduler...")
            scheduler.shutdown()
            logger.info("Scheduler apagado exitosamente.")
