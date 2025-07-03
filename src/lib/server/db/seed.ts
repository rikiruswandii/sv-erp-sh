import 'dotenv/config';
import { db } from './index';
import * as table from './schema';

import { seedRoles } from './seed/seedRoles';
import { seedUsers } from './seed/seedUsers';
import { seedSettings } from './seed/seedSettings';

async function clearDatabase() {
	console.log('Mengosongkan data database...');
    await db.delete(table.sessions);
	await db.delete(table.roles);
	await db.delete(table.users);
	await db.delete(table.settings);
}

async function seed() {
	try {
		await clearDatabase(); 
		await seedRoles();
		await seedUsers();
		await seedSettings();
		console.log('Semua seeding selesai!');
	} catch (err) {
		console.error('Gagal melakukan seeding:', err);
		process.exit(1);
	} finally {
		if (typeof db.end === 'function') await db.end();
		else if (typeof db.close === 'function') await db.close();
		process.exit(0);
	}
}

seed();
