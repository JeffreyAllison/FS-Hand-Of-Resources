-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS birds CASCADE;
DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS guitars CASCADE;
DROP TABLE IF EXISTS zodiacs CASCADE;
DROP TABLE IF EXISTS albums CASCADE;

CREATE TABLE birds (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bird_name VARCHAR,
  average_wingspan_in_cm INT NOT NULL,
  flying_bird BOOLEAN
);

CREATE TABLE pets (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pet_name VARCHAR,
  pet_colors VARCHAR,
  pet_type VARCHAR
);

CREATE TABLE guitars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  guitar_type VARCHAR,
  body_material VARCHAR,
  wood_type VARCHAR
);

CREATE TABLE zodiacs (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  zodiac_name VARCHAR,
  zodiac_symbol VARCHAR,
  zodiac_element VARCHAR
);

CREATE TABLE albums (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  artist_name VARCHAR,
  album_title VARCHAR,
  album_genres VARCHAR
);

INSERT INTO birds (
  bird_name,
  average_wingspan_in_cm,
  flying_bird
)
VALUES 
('Golden Eagle', 200, 'true'), 
('Northern Flicker', 50, 'true'), 
('Emperor Penguin', 80, 'true'), 
('Indigo Bunting', 20, 'true'), 
('Common Raven', 120, 'true');

INSERT INTO pets (
  pet_name,
  pet_colors,
  pet_type
)
VALUES 
('Larry', 'Blue', 'fish'), 
('Max', 'Black and White', 'cat'), 
('Midnight', 'Black', 'cat'), 
('Heidi', 'Black and Tan', 'cat'), 
('Whiskey Ginger', 'Black and Tan and White', 'dog'); 

INSERT INTO guitars (
  guitar_type,
  body_material,
  wood_type
)
VALUES
('Stratocaster', 'Wood', 'Alder'), 
('Telecaster', 'Wood', 'Pine'), 
('Les Paul', 'Wood', 'Mahogany'), 
('Dan Armstrong', 'Acrylic', 'none'), 
('Flying V', 'Wood', 'Korina'); 

INSERT INTO zodiacs (
  zodiac_name,
  zodiac_symboL,
  zodiac_element
)
VALUES
('Aries', 'Ram', 'Fire'), 
('Taurus', 'Bull', 'Earth'), 
('Gemini', 'Twins', 'Air'), 
('Cancer', 'Crab', 'Water'), 
('Leo', 'Lion', 'Fire');

INSERT INTO albums (
  artist_name,
  album_title,
  album_genres
)
VALUES
('Sleep', 'Jerusalem', 'Metal, Doom, Drone'), 
('Esperanza Spalding', 'Emilys D+Evolution', 'Jazz, Fusion'), 
('Can', 'Future Days', 'Krautrock, Ambient, Progressive Rock'), 
('King Crimson', 'Red', 'Progressive Rock'), 
('MF DOOM', 'Mm..Food', 'Hip Hop');

