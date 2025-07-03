import { z } from 'zod';

export const settingSchema = z.object({
  group: z.string().min(1).max(100),
  key: z.string().min(1).max(100),
  value: z.string().max(1).max(100),
  description: z.string().min(1),
});

export type SettingSchema = typeof settingSchema;