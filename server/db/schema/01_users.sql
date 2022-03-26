DROP TABLE IF EXISTS parent CASCADE;
DROP TABLE IF EXISTS baby CASCADE;
DROP TABLE IF EXISTS parent_baby CASCADE;
DROP TABLE IF EXISTS log CASCADE;


CREATE TABLE parent (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
);


CREATE TABLE baby (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  date_of_birth TIMESTAMP,
  born_at VARCHAR(255)
  picture_url,

)

CREATE TABLE parent_baby (
  id SERIAL PRIMARY KEY NOT NULL,
  FOREIGN KEY (baby_id) REFERENCES baby(id),
  FOREIGN KEY (created_by) REFERENCES parents(id),

)

CREATE TABLE log (
  id SERIAL PRIMARY KEY NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  event_detail VARCHAR NOT NULL,
  event_datetime DATE,
  FOREIGN KEY (baby_id) REFERENCES baby(id),
  FOREIGN KEY (created_by) REFERENCES parents(id),
)





