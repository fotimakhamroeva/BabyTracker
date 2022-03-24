DROP TABLE IF EXISTS parent CASCADE;
DROP TABLE IF EXISTS baby CASCADE;
DROP TABLE IF EXISTS parent_baby CASCADE;
DROP TABLE IF EXISTS log CASCADE;


CREATE TABLE parent(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE baby(
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  date_of_birth TIMESTAMP,
  born_at VARCHAR(255),
  picture_url VARCHAR(255)
);

CREATE TABLE parent_baby (
  id SERIAL PRIMARY KEY NOT NULL,
  babyID INT REFERENCES baby(id),
  createdBY INT REFERENCES parent(id)
);

CREATE TABLE log (
  id SERIAL PRIMARY KEY NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  event_detail VARCHAR NOT NULL,
  event_datetime DATE,
  babyID INT REFERENCES baby(id),
  createdBY INT REFERENCES parent(id)
);




