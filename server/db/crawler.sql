CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstName" varchar,
  "lastName" varchar,
  "email" varchar UNIQUE NOT NULL,
  "phoneNumber" varchar,
  "numberId" varchar,
  "address" varchar,
  "roleId" int,
  "createdAt" timestamp,
  "updateAt" timestamp,
  "createdBy" int
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "roleValidate" int,
  "createdAt" timestamp,
  "updateAt" timestamp,
  "createdAy" int
);

CREATE TABLE "groups" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "userId" int,
  "createdAt" timestamp,
  "updateAt" timestamp,
  "createdAy" int
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "groupId" int,
  "userId" int,
  "content" text,
  "type" int,
  "createdAt" timestamp,
  "updateAt" timestamp,
  "createdAy" int
);

ALTER TABLE "users" ADD FOREIGN KEY ("roleId") REFERENCES "roles" ("id");

COMMENT ON COLUMN "roles"."roleValidate" IS 'phan quyen nhi phan';

COMMENT ON COLUMN "groups"."name" IS 'mot nhom chat';

COMMENT ON COLUMN "messages"."type" IS '1 text,2 json,... mat dinh la 1';
