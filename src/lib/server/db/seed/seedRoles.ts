// src/lib/server/db/seed/seedRoles.ts
import { generateUserId } from '$lib/hooks/useUserId';
import { db } from '../index';
import { roles } from '../schema';
import * as rolesModule from '$lib/server/role';

export async function seedRoles() {
	const rolesData = [
		{ name: 'superadmin', description: 'Super Admin' },
		{ name: 'admin', description: 'Admin' },
		{ name: 'manager', description: 'Manager' },
		{ name: 'staff', description: 'Staff' },
		{ name: 'user', description: 'User' }
	];

	console.log('Seeding roles...');
	for (const role of rolesData) {
		const id = generateUserId(); 
		await rolesModule.createRole({
			id,
			...role
		});
	}
}
