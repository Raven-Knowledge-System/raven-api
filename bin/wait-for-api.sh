#!/usr/bin/env bash
set -euo pipefail

attempt_counter=0
max_attempts=15

echo "Checking if the service is up."
until [[ "$(curl -s -o /dev/null -w ''%{http_code}'' localhost:3000/v1)" = "200" ]]; do
    if [ ${attempt_counter} -eq ${max_attempts} ]; then
        echo "Damn, it's dead..."
        docker-compose logs api
        exit 1
    fi

    if [ "$attempt_counter" -eq "0" ]; then
        printf 'nope...\n'
    else
        printf 'still nope...\n'
    fi

    attempt_counter=$(($attempt_counter + 1))
    sleep 5
done
echo "Server is up and running!"
