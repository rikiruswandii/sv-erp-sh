// src/lib/server/db/seed/seedSettings.ts
import { APP_CONFIG } from '$lib/config/app';
import { db } from '../index';
import { settings } from '../schema';
import { generateUserId } from '$lib/hooks/useUserId';

export async function seedSettings() {
	console.log('Seeding settings...');

	for (const [key, value] of Object.entries(APP_CONFIG)) {
		await db.insert(settings).values({
			id: generateUserId(), 
			group: 'general',     
			key: key,             
			value: value,
			description: null     
		}).onDuplicateKeyUpdate({
			set: {
				value: value
			}
		});
	}
}
