import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllNewsletter() {
    return await db.select().from(table.newsletterSubscriptions);
}

export async function getNewsletterById(id: string): Promise<table.NewsletterSubscription | null> {
  const result = await db.select().from(table.newsletterSubscriptions).where(eq(table.newsletterSubscriptions.id, id));
  return result[0] ?? null;
}
export async function getNewsletterByEmail(email: string): Promise<table.NewsletterSubscription | null> {
  const result = await db.select().from(table.newsletterSubscriptions).where(eq(table.newsletterSubscriptions.email, email));
  return result[0] ?? null;
}

export async function createNewsletter(data: table.NewNewsletterSubscription) {
  return await db.insert(table.newsletterSubscriptions).values(data);
}

export async function updateNewsletter(id: string, data: Partial<table.NewsletterSubscription>) {
  return await db
    .update(table.newsletterSubscriptions)
    .set(data)
    .where(eq(table.newsletterSubscriptions.id, id));
}

export async function deleteNewsletter(id: string) {
  return await db.delete(table.newsletterSubscriptions).where(eq(table.newsletterSubscriptions.id, id));
}