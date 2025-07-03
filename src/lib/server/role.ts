import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllRole() {
    return await db.select().from(table.roles);
}

export async function getRoleById(id: string): Promise<table.Role | null> {
  const result = await db.select().from(table.roles).where(eq(table.roles.id, id));
  return result[0] ?? null;
}

export async function createRole(data: table.NewRole) {
  return await db.insert(table.roles).values(data);
}

export async function updateRole(id: string, data: Partial<table.Role>) {
  return await db
    .update(table.roles)
    .set(data)
    .where(eq(table.roles.id, id));
}

export async function deleteRole(id: string) {
  return await db.delete(table.roles).where(eq(table.roles.id, id));
}