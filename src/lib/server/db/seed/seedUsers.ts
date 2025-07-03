import { generateUserId } from '$lib/hooks/useUserId';
import { hash } from '@node-rs/argon2';
import * as rolesModule from '$lib/server/role';
import * as usersModule from '$lib/server/user';

export async function seedUsers() {
	const roles = await rolesModule.getAllRole();

	if (!process.env.PASSWORD_DEFAULT) {
		throw new Error('PASSWORD_DEFAULT environment variable is not set.');
	}

	console.log('Seeding users...');
	const passwordHash = await hash(process.env.PASSWORD_DEFAULT, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	const superadmin = roles.find((r) => r.name.toLowerCase() === 'superadmin');
	console.log('All roles:', roles);
	console.log('Superadmin role:', superadmin);

	if (!superadmin) {
		throw new Error('Role "Superadmin" tidak ditemukan dalam roles.');
	}

	const usersData = [
		{
			id: generateUserId(),
			roleId: superadmin.id,
			name: 'Developer',
			username: 'developer',
			email: 'developer@example.com',
			passwordHash: passwordHash,
			emailVerified: true
		},
		{
			id: generateUserId(),
			roleId: superadmin.id,
			name: 'Admin',
			username: 'admin',
			email: 'admin@example.com',
			passwordHash: passwordHash,
			emailVerified: true
		}
	];

	for (const user of usersData) {
		await usersModule.createUser(user);
	}
}
