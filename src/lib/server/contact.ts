import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllContact() {
    return await db.select().from(table.contacts);
}

export async function getContactById(id: string): Promise<table.Contact | null> {
  const result = await db.select().from(table.contacts).where(eq(table.contacts.id, id));
  return result[0] ?? null;
}

export async function createContact(data: table.NewContact) {
  return await db.insert(table.contacts).values(data);
}

export async function updateContact(id: string, data: Partial<table.Contact>) {
  return await db
    .update(table.contacts)
    .set(data)
    .where(eq(table.contacts.id, id));
}

export async function deleteContact(id: string) {
  return await db.delete(table.contacts).where(eq(table.contacts.id, id));
}