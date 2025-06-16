import { generateUserId } from '../../hooks/use-id';
import { db } from './index';
import { roles, users } from './schema';
import { hash } from '@node-rs/argon2';
import 'dotenv/config';

async function seed() {
    // Seed roles
    const rolesData = [
        { id: '1', name: 'superadmin', description: 'Super Admin' },
        { id: '2', name: 'admin', description: 'Admin' },
        { id: '3', name: 'manager', description: 'Manager' },
        { id: '4', name: 'staff', description: 'Staff' },
        { id: '5', name: 'user', description: 'User' }
    ];

    console.log('Seeding roles...');
    for (const role of rolesData) {
        await db.insert(roles).values(role)
            .onDuplicateKeyUpdate({
                set: {
                    name: role.name,
                    description: role.description
                }
            });
    }

    // Seed users
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

    const usersData = [
        {
            id: generateUserId(),
            roleId: '1', // superadmin
            name: 'Developer',
            email: 'developer@example.com',
            passwordHash,
            emailVerified: true
        },
        {
            id: generateUserId(),
            roleId: '2', // admin
            name: 'Admin',
            email: 'admin@example.com',
            passwordHash,
            emailVerified: true
        }
    ];

    for (const user of usersData) {
        await db.insert(users).values(user)
            .onDuplicateKeyUpdate({
                set: {
                    name: user.name,
                    email: user.email,
                    roleId: user.roleId
                }
            });
    }

    console.log('Seeding selesai!');
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
});
