CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "userId" int,
  "name" varchar,
  "extension" varchar, -- .jpg , .jpeg , .jfif , .pjpeg , .pjp, .doc, .docx, .xls, .xlsx, .pdf ....
  "type" varchar, -- avatar, chats . .. . .
  "status" int, --0 default, 1 active avatar
  "path" varchar,
  "isDelete" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "createdBy" int
);