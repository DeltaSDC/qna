-- DROP DATABASE IF EXISTS productqas;

-- CREATE DATABASE productqas;

\c productqas;

CREATE TABLE IF NOT EXISTS questions (
  question_id serial PRIMARY KEY,
  question_body varchar(150),
  question_date timestamp,
  question_helpfulness integer,
  reported integer,
  asker_name varchar(60),
  product_id integer
);



CREATE TABLE IF NOT EXISTS answers (
  answer_id serial PRIMARY KEY,
  body varchar(150),
  answer_date timestamp,
  answerer_name varchar(30),
  helpfulness integer,
  question_id integer REFERENCES questions
);

CREATE TABLE IF NOT EXISTS photos (
  photo_id serial PRIMARY KEY,
  url varchar(150),
  answer_id integer REFERENCES answers
)