#!/bin.bash

# This bash script will create DB and seed it

# Path to directory bash script is in
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

DATABASE="productqas"
USER="ethan_parent"

QOUTPUT="Qposts.csv"
QFILEPATH="$DIR/$QOUTPUT"

# Defaults record gen to 10M
LINES=${1:-10000000}

## Import the DB
SCHEMA="$DIR/schema.sql"
psql -U $USER < $SCHEMA

## RUN the generator script
node serverSDC/genQuestions.js --output=$QFILEPATH --lines=$LINES

## Import posts.csv file to seed Database (questions table)
psql -U $USER -d $DATABASE -c "COPY questions FROM '$QFILEPATH' CSV HEADER;"

