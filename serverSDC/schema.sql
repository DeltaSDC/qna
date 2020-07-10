DROP DATABASE IF EXISTS productqas;

CREATE DATABASE productqas;

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
  body varchar(60),
  date timestamp,
  answerer_name varchar(60),
  helpfulness integer,
  photos text[],
  question_id integer REFERENCES questions
);