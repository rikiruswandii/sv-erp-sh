import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllNotification() {
    return await db.select().from(table.notifications);
}

export async function getNotificationById(id: string): Promise<table.Notification | null> {
  const result = await db.select().from(table.notifications).where(eq(table.notifications.id, id));
  return result[0] ?? null;
}

export async function createNotification(data: table.NewNotification) {
  return await db.insert(table.notifications).values(data);
}

export async function updateNotification(id: string, data: Partial<table.Notification>) {
  return await db
    .update(table.notifications)
    .set(data)
    .where(eq(table.notifications.id, id));
}

export async function deleteNotification(id: string) {
  return await db.delete(table.notifications).where(eq(table.notifications.id, id));
}