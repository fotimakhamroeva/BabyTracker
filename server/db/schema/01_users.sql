DROP TABLE IF EXISTS parents CASCADE;
DROP TABLE IF EXISTS baby CASCADE;
DROP TABLE IF EXISTS parent_baby CASCADE;
DROP TABLE IF EXISTS LOGS CASCADE;


CREATE TABLE parents (
  parent_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  email_id VARCHAR(255) NOT NULL UNIQUE,
  is_authenticated BOOLEAN DEFAULT false
);


CREATE TABLE baby (
  baby_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  date_of_birth DATE,
  is_authenticated BOOLEAN DEFAULT false

)

CREATE TABLE parent_baby (
  parent_baby_id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (baby_id) REFERENCES baby(baby_id),
  FOREIGN KEY (parent_id) REFERENCES parents(parent_id),

)

CREATE TABLE LOGS (
  log_id SERIAL PRIMARY KEY NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  event_detail VARCHAR(255) NOT NULL,
  event_datetime DATE,
  FOREIGN KEY (baby_id) REFERENCES baby(baby_id),
  FOREIGN KEY (parent_id) REFERENCES parents(parent_id),
)




