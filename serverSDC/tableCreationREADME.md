# Commands to create the tables**

## Create Question Table


CREATE TABLE questions (
  question_id serial PRIMARY KEY,
  question_body varchar(255),
  question_date timestamp,
  question_helpfulness integer,
  reported integer,
  asker_name varchar(60),
  product_id integer
);


## Create Answer Table


CREATE TABLE answers (
  answer_id serial PRIMARY KEY,
  body varchar(255),
  date timestamp,
  answerer_name varchar(60),
  helpfulness integer,
  photos text[],
  question_id integer REFERENCES questions
);