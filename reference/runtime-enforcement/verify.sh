#!/bin/sh
set -eu

# Lightweight host-side verification for the reference workspace.
# Requires Docker and Docker Compose.

printf '%s\n' 'Running Clover runtime-enforcement reference...'
docker compose -f docker-compose.yml run --rm agent
printf '%s\n' 'Runtime enforcement check completed.'
