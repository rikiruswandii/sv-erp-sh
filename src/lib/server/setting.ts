import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function getAllSetting() {
    return await db.select().from(table.settings);
}

export async function getSettingById(id: string): Promise<table.Setting | null> {
  const result = await db.select().from(table.settings).where(eq(table.settings.id, id));
  return result[0] ?? null;
}

export async function createSetting(data: table.NewSetting) {
  return await db.insert(table.settings).values(data);
}

export async function updateSetting(id: string, data: Partial<table.Setting>) {
  return await db
    .update(table.settings)
    .set(data)
    .where(eq(table.settings.id, id));
}

export async function deleteSetting(id: string) {
  return await db.delete(table.settings).where(eq(table.settings.id, id));
}

export async function getSettingMapByGroup(group: string): Promise<Record<string, string>> {
  const results = await db
    .select({
      key: table.settings.key,
      value: table.settings.value
    })
    .from(table.settings)
    .where(eq(table.settings.group, group));

  return Object.fromEntries(results.map(item => [item.key, item.value]));
}
