DROP TABLE IF EXISTS profile;

CREATE TABLE profile (
  id INTEGER PRIMARY KEY,
  newName text,
  newHometown text,
  newAge INT,
  created_at DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER profiles BEFORE UPDATE ON profile BEGIN
UPDATE profile SET updated_at=CURRENT_TIMESTAMP WHERE id=new.id;
END;
