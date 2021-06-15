ALTER TABLE roles
ADD COLUMN "roleChild" INT DEFAULT 0;
ALTER TABLE roles
RENAME COLUMN "roleValidate" TO "role";