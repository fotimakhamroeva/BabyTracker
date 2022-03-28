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
  picture_url VARCHAR(255),
  parentId INT NOT NULL,
  FOREIGN KEY (parentId) REFERENCES parent(id)
);

-- CREATE TABLE parent_baby (
--   id SERIAL PRIMARY KEY NOT NULL,
--   FOREIGN KEY (id) AS babyID REFERENCES baby(id),
--   FOREIGN KEY (id) AS parentID REFERENCES parent(id)
-- );

CREATE TABLE log (
  id SERIAL PRIMARY KEY NOT NULL,
  event_name VARCHAR(255),
  event_detail VARCHAR(255),
  event_type VARCHAR(255),
  event_amount VARCHAR(255),
  event_unit VARCHAR(255),
  event_datetime TIMESTAMP,
  babyId INT,
  FOREIGN KEY (babyId) REFERENCES baby(id)

);




