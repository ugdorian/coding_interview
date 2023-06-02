#!/usr/bin/sh

. .venv/bin/activate
flask --app main run
deactivate

