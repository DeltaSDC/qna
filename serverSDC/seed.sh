#!/bin.bash

# This bash script will create DB and seed it

# Path to directory bash script is in
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DATABASE="productqas"
USER="ethan_parent"

OUTPUT="posts.csv"
FILEPATH="$DIR/$OUTPUT"

# Defaults record gen to 10M
LINES=${1:-10000000}

## Import the DB
SCHEMA="$DIR/schema.sql"
psql -U $USER < $SCHEMA

## RUN the generator script
node serverSDC/dataGen.js --output=$FILEPATH --lines=$LINES

## Import posts.csv file to seed Database
psql -U $USER -d $DATABASE -c "COPY questions FROM '$FILEPATH' CSV HEADER;"