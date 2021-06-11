DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstName" varchar,
  "lastName" varchar,
  "nickName" varchar,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar,
  "phoneNumber" varchar,
  "numberId" varchar,
  "address" varchar,
  "roleId" int,
  "isDelete" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdBy" int
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "parentId" int,
  "name" varchar,
  "roleValidate" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdBy" int
);

CREATE TABLE "groups" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "isDelete" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdBy" int
);

CREATE TABLE "groupUsers" (
  "id" SERIAL PRIMARY KEY,
  "groupId" int,
  "userId" int,
  "isDelete" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdBy" int
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "groupId" int,
  "userId" int,
  "content" text,
  "type" int,
  "isDelete" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdBy" int
);

ALTER TABLE "users" ADD FOREIGN KEY ("roleId") REFERENCES "roles" ("id");

COMMENT ON COLUMN "roles"."roleValidate" IS 'phan quyen nhi phan';

COMMENT ON COLUMN "groups"."name" IS 'mot nhom chat';

COMMENT ON COLUMN "messages"."type" IS '1 text,2 json,... mat dinh la 1';
