#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
cd quiniela
python manage.py collectstatic --no-input
python manage.py migrate

# Sincronizar equipos y partidos (es seguro ejecutarlo en cada deploy porque usa get_or_create)
python manage.py sync_initial

# Crear superusuario automáticamente si se configuran las variables y no existe
if [[ -n "${DJANGO_SUPERUSER_USERNAME}" && -n "${DJANGO_SUPERUSER_PASSWORD}" ]]; then
    python manage.py createsuperuser --noinput || true
fi
