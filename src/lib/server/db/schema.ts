import { mysqlTable, varchar, timestamp, boolean, text, mysqlEnum, date, index } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

// TABEL ROLES
export const roles = mysqlTable('roles', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: varchar('name', { length: 64 }).notNull().unique(),
	description: varchar('description', { length: 255 }),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

// TABEL USERS
export const users = mysqlTable('users', {
	id: varchar('id', { length: 36 }).primaryKey(),
	roleId: varchar('role_id', { length: 36 }).references(() => roles.id).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	emailVerified: boolean('email_verified').default(false),
	verificationToken: varchar('verification_token', { length: 255 }),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [
	index('idx_users_role_id').on(table.roleId)
]);

// TABEL PASSWORD RESET TOKENS
export const passwordResetTokens = mysqlTable('password_reset_tokens', {
	id: varchar('id', { length: 36 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
	token: varchar('token', { length: 255 }).notNull().unique(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// TABEL SESSIONS
export const sessions = mysqlTable('sessions', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
	sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// TABEL DOCUMENTS (polymorphic)
export const documents = mysqlTable('documents', {
	id: varchar('id', { length: 36 }).primaryKey(),
	ownerId: varchar('owner_id', { length: 36 }).notNull(),
	ownerType: varchar('owner_type', { length: 64 }).notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	url: varchar('url', { length: 512 }).notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [index('idx_documents_owner').on(table.ownerType, table.ownerId)
]);

// TABEL SETTINGS
export const settings = mysqlTable('settings', {
	id: varchar('id', { length: 36 }).primaryKey(),
	group: varchar('group', { length: 64 }),
	key: varchar('key', { length: 128 }).notNull().unique(),
	value: varchar('value', { length: 1024 }).notNull(),
	description: varchar('description', { length: 255 }),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

// TABEL CLIENTS
export const clients = mysqlTable('clients', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	contactEmail: varchar('contact_email', { length: 255 }),
	phone: varchar('phone', { length: 20 }),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

// TABEL PROJECTS
export const projects = mysqlTable('projects', {
	id: varchar('id', { length: 36 }).primaryKey(),
	clientId: varchar('client_id', { length: 36 }).notNull().references(() => clients.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }).notNull(),
	description: text('description'),
	startDate: date('start_date'),
	dueDate: date('due_date'),
	status: mysqlEnum('status', ['pending', 'active', 'completed', 'on_hold']).default('pending'),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [index('idx_projects_client_id').on(table.clientId)
]);

// TABEL TASKS
export const tasks = mysqlTable('tasks', {
	id: varchar('id', { length: 36 }).primaryKey(),
	projectId: varchar('project_id', { length: 36 }).notNull().references(() => projects.id, { onDelete: 'cascade' }),
	assignedTo: varchar('assigned_to', { length: 36 }).references(() => users.id, { onDelete: 'set null' }),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description'),
	status: mysqlEnum('status', ['open', 'in_progress', 'completed']).default('open'),
	priority: mysqlEnum('priority', ['low', 'medium', 'high']).default('medium'),
	deadline: date('deadline'),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [index('idx_tasks_project_id').on(table.projectId),
	index('idx_tasks_assigned_to').on(table.assignedTo)
]);

// RELATIONS (non‑polymorphic)
export const clientsRelations = relations(clients, ({ many }) => ({
	projects: many(projects)
}));
export const projectsRelations = relations(projects, ({ one, many }) => ({
	client: one(clients, { fields: [projects.clientId], references: [clients.id] }),
	tasks: many(tasks)
}));
export const tasksRelations = relations(tasks, ({ one }) => ({
	project: one(projects, { fields: [tasks.projectId], references: [projects.id] }),
	assignee: one(users, { fields: [tasks.assignedTo], references: [users.id] })
}));
export const rolesRelations = relations(roles, ({ many }) => ({
	users: many(users)
}));
export const usersRelations = relations(users, ({ one, many }) => ({
	role: one(roles, { fields: [users.roleId], references: [roles.id] }),
	sessions: many(sessions),
	tasks: many(tasks),
	passwordResetTokens: many(passwordResetTokens)
}));
export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, { fields: [sessions.userId], references: [users.id] })
}));
export const passwordResetTokensRelations = relations(passwordResetTokens, ({ one }) => ({
	user: one(users, { fields: [passwordResetTokens.userId], references: [users.id] })
}));

export type Role = typeof roles.$inferSelect;
export type User = typeof users.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type Setting = typeof settings.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Client = typeof clients.$inferSelect;

export type NewRole = typeof roles.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;
export type NewDocument = typeof documents.$inferInsert;
export type NewSetting = typeof settings.$inferInsert;
export type NewTask = typeof tasks.$inferInsert;
export type NewProject = typeof projects.$inferInsert;
export type NewClient = typeof clients.$inferInsert;

