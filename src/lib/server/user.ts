import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllUsers() {
  return await db
    .select({
      id: table.users.id,
      email: table.users.email,
      name: table.users.name,
      createdAt: table.users.createdAt,
      updatedAt: table.users.updatedAt,
      emailVerified: table.users.emailVerified,
      role: {
        id: table.roles.id,
        name: table.roles.name,
      },
    })
    .from(table.users)
    .leftJoin(table.roles, eq(table.users.roleId, table.roles.id));
}


export async function getSessions() {
  return await db.select().from(table.sessions);
}

export async function getProjects() {
  return await db.select().from(table.projects);
}

export async function getTasks() {
  return await db.select().from(table.tasks);
}

export async function getUserById(id: string): Promise<table.User | null> {
  const result = await db.select().from(table.users).where(eq(table.users.id, id));
  return result[0] ?? null;
} 

export async function createUser(data: table.NewUser) {
  return await db.insert(table.users).values(data);
}

export async function updateUserPassword(userId: string, passwordHash: string) {
  return await db
    .update(table.users)
    .set({ passwordHash: passwordHash })
    .where(eq(table.users.id, userId));
}

export async function deleteUser(id: string) {
  return await db.delete(table.users).where(eq(table.users.id, id));
}
