DROP TABLE IF EXISTS chores;

CREATE TABLE chores (
  id INTEGER PRIMARY KEY,
  person text,
  chore text,
  created_at DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER chores BEFORE UPDATE ON chores BEGIN
UPDATE chores SET updated_at=CURRENT_TIMESTAMP WHERE id=new.id;
END;
