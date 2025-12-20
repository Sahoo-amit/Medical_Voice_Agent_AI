import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  credits: integer(),
  email: varchar({ length: 255 }).notNull().unique()
});

export const SessionChatTable = pgTable("sessionChatTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId:varchar().notNull(),
  notes:text(),
  conversation:json(),
  selectedDoctor:json(),
  report:json(),
  createdBy:varchar().references(()=>usersTable.email),
  createdOn:varchar()
});