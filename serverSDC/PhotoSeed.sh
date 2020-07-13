#!/bin.bash

# This bash script will create DB and seed it

# Path to directory bash script is in
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DATABASE="productqas"
USER="ethan_parent"

POUTPUT="Pposts.csv"
PFILEPATH="$DIR/$POUTPUT"

# Defaults record gen to 10M
LINES=${1:-1000}

## Import the DB
SCHEMA="$DIR/schema.sql"
psql -U $USER < $SCHEMA

## RUN the generator script
node serverSDC/genPhotos.js --output=$PFILEPATH --lines=$LINES

## Import posts.csv file to seed Database (questions table)
psql -U $USER -d $DATABASE -c "COPY photos FROM '$PFILEPATH' CSV HEADER;"