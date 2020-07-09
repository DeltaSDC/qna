// **Commands to create the tables**

// Create Product Table


CREATE TABLE products (
  product_id serial PRIMARY KEY
)

*/
// Create Question Table
/*

CREATE TABLE questions (
  question_id serial PRIMARY KEY,
  question_body varchar(255),
  question_date timestamp,
  question_helpfulness integer,
  reported integer,
  asker_name varchar(60),
  product_id integer REFERENCES products
)

*/
// Create Answer Table
/*

CREATE TABLE answers (
  answer_id serial PRIMARY KEY,
  body varchar(255),
  date timestamp,
  answerer_name varchar(60),
  helpfulnes integer,
  photos text[],
  question_id integer REFERENCES questions
)