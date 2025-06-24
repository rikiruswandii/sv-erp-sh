import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllPage() {
  return await db.select().from(table.pages);
}

export async function getPageById(id: string): Promise<table.Page | null> {
  const result = await db.select().from(table.pages).where(eq(table.pages.id, id));
  return result[0] ?? null;
}

export async function createPage(data: table.NewPage) {
  return await db.insert(table.pages).values(data);
}

export async function updatePage(id: string, data: Partial<table.Page>) {
  return await db
    .update(table.pages)
    .set(data)
    .where(eq(table.pages.id, id));
}

export async function deletePage(id: string) {
  return await db.delete(table.pages).where(eq(table.pages.id, id));
}