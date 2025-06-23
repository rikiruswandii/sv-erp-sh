import { mysqlTable, varchar, timestamp, boolean, text, mysqlEnum, date, index } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import { integer } from 'drizzle-orm/gel-core';

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
	username: varchar('username', { length: 80 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	emailVerified: boolean('email_verified').default(false),
	verificationToken: varchar('verification_token', { length: 255 }),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [
	index('idx_users_role_id').on(table.roleId),
	index('idx_users_email').on(table.email),
	index('idx_users_username').on(table.username)
]);

// TABEL USER PROFILES (untuk menyimpan informasi tambahan pengguna)
export const userProfiles = mysqlTable('user_profiles', {
	id: varchar('id', { length: 36 }).primaryKey(), // bisa sama dengan user_id
	userId: varchar('user_id', { length: 36 }).notNull().unique().references(() => users.id),
	address: text('address'),
	birthDate: date('birth_date'),
	gender: mysqlEnum('gender', ['male', 'female', 'other']),
	phone: varchar('phone', { length: 20 }),
	bio: text('bio'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

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
	name: varchar('name', { length: 80 }).notNull(),
	url: varchar('url', { length: 512 }).notNull(),
	fileType: varchar('file_type', { length: 64 }),
	size: integer('size'), // byte
	description: text('description'),
	isPublic: boolean('is_public').default(false),
	thumbnailUrl: varchar('thumbnail_url', { length: 512 }),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [
	index('idx_documents_owner').on(table.ownerType, table.ownerId)
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
	status: mysqlEnum('status', ['open', 'in_progress', 'completed', 'waiting']).default('waiting'),
	priority: mysqlEnum('priority', ['low', 'medium', 'high']).default('medium'),
	deadline: date('deadline'),
	deletedAt: timestamp('deleted_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
}, (table) => [index('idx_tasks_project_id').on(table.projectId),
	index('idx_tasks_assigned_to').on(table.assignedTo)
]);

// TABEL PAGES (untuk konten statis seperti 'About', 'Contact', dsb.)
export const pages = mysqlTable('pages', {
	id: varchar('id', { length: 36 }).primaryKey(),
	slug: varchar('slug', { length: 255 }).notNull().unique(), // contoh: 'about', 'pricing'
	title: varchar('title', { length: 255 }).notNull(),
	content: text('content'), // isi HTML / markdown / rich text
	published: boolean('published').default(false),
	publishedAt: timestamp('published_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

// TABEL ACTIVITY LOGS (untuk mencatat aktivitas pengguna)
export const activityLogs = mysqlTable('activity_logs', {
	id: varchar('id', { length: 36 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
	action: varchar('action', { length: 255 }).notNull(),
	entityType: varchar('entity_type', { length: 64 }),
	entityId: varchar('entity_id', { length: 36 }),
	meta: text('meta'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// TABEL NEWS (untuk artikel atau berita)
export const news = mysqlTable('news', {
	id: varchar('id', { length: 36 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	content: text('content').notNull(),
	published: boolean('published').default(false), // 'true' atau 'false'
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

// TABEL TAGS (untuk sistem tagging)
export const tags = mysqlTable('tags', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: varchar('name', { length: 100 }).notNull().unique()
});

// TABEL TAGGABLES (untuk relasi polymorphic antara tags dan entitas lain)
export const taggables = mysqlTable('taggables', {
	id: varchar('id', { length: 36 }).primaryKey(),
	tagId: varchar('tag_id', { length: 36 }).references(() => tags.id).notNull().unique(),
	entityType: varchar('entity_type', { length: 64 }).notNull().unique(),
	entityId: varchar('entity_id', { length: 36 }).notNull().unique()
});

// TABEL NOTIFICATIONS (untuk sistem notifikasi)
export const notifications = mysqlTable('notifications', {
	id: varchar('id', { length: 36 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
	title: varchar('title', { length: 255 }).notNull(),
	message: text('message'),
	readAt: timestamp('read_at'),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// TABEL ATTACHMENTS (untuk file yang diupload, bisa untuk berbagai entitas)
export const attachments = mysqlTable('attachments', {
	id: varchar('id', { length: 36 }).primaryKey(),
	entityType: varchar('entity_type', { length: 64 }).notNull(),
	entityId: varchar('entity_id', { length: 36 }).notNull(),
	filename: varchar('filename', { length: 255 }),
	url: varchar('url', { length: 512 }).notNull(),
	uploadedAt: timestamp('uploaded_at').default(sql`CURRENT_TIMESTAMP`)
}, (table) => [index('idx_attachments_id').on(table.entityId)
]);

// TABEL COMMENTS (untuk komentar pada berbagai entitas)
export const comments = mysqlTable('comments', {
	id: varchar('id', { length: 36 }).primaryKey(),
	entityType: varchar('entity_type', { length: 64 }).notNull(),
	entityId: varchar('entity_id', { length: 36 }).notNull(),
	userId: varchar('user_id', { length: 36 }).references(() => users.id),
	content: text('content').notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
}, (table) => [index('idx_comments_id').on(table.entityId)
]);

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
	user: one(users, { fields: [userProfiles.userId], references: [users.id] })
}));

// RELASI UNTUK PAGES
export const pagesRelations = relations(pages, () => ({}));
// Jika nanti kamu ingin menambahkan relasi seperti author atau metadata tambahan, kamu bisa extend di sini.

// RELASI UNTUK ACTIVITY_LOGS
export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
	user: one(users, { fields: [activityLogs.userId], references: [users.id] })
	// Jika ingin relasi polymorphic ke entitas lain (seperti project, task, dsb.), implementasi manual di sisi aplikasi
}));

// RELASI UNTUK ACTIVITY_LOGS
export const newsRelations = relations(news, ({ one }) => ({
	user: one(users, { fields: [news.userId], references: [users.id] })
	// Jika ingin relasi polymorphic ke entitas lain (seperti project, task, dsb.), implementasi manual di sisi aplikasi
}));

// RELASI UNTUK Notifications
export const notificationsRelations = relations(notifications, ({ one }) => ({
	user: one(users, { fields: [notifications.userId], references: [users.id] })
	// Jika ingin relasi polymorphic ke entitas lain (seperti project, task, dsb.), implementasi manual di sisi aplikasi
}));

// RELASI UNTUK Notifications
export const commentsRelations = relations(comments, ({ one }) => ({
	user: one(users, { fields: [comments.userId], references: [users.id] })
	// Jika ingin relasi polymorphic ke entitas lain (seperti project, task, dsb.), implementasi manual di sisi aplikasi
}));

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
	activityLogs: many(activityLogs),
	comments: many(comments),
	notifications: many(notifications),
	tasks: many(tasks),
	passwordResetTokens: many(passwordResetTokens),
	profile: one(userProfiles, { fields: [users.id], references: [userProfiles.userId] })
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
export type Page = typeof pages.$inferSelect;
export type News = typeof news.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Attachment = typeof attachments.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Tag = typeof tags.$inferSelect;
export type Taggable = typeof taggables.$inferSelect;

export type NewRole = typeof roles.$inferInsert;
export type NewUser = typeof users.$inferInsert;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;
export type NewDocument = typeof documents.$inferInsert;
export type NewSetting = typeof settings.$inferInsert;
export type NewTask = typeof tasks.$inferInsert;
export type NewProject = typeof projects.$inferInsert;
export type NewClient = typeof clients.$inferInsert;
export type NewPage = typeof pages.$inferInsert;
export type NewNews = typeof news.$inferInsert;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type NewNotification = typeof notifications.$inferInsert;
export type NewAttachment = typeof attachments.$inferInsert;
export type NewComment = typeof comments.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewTaggable = typeof taggables.$inferInsert;

