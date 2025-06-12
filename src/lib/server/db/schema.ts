import { mysqlTable, varchar, timestamp, boolean } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const users = mysqlTable('users', {
	id: varchar('id', { length: 36 }).primaryKey(),
	name: varchar('name', { length: 255 }),
	email: varchar('email', { length: 255 }).notNull().unique(),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	emailVerified: boolean('email_verified').default(false),
	verificationToken: varchar('verification_token', { length: 255 }),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp('updated_at').onUpdateNow().default(sql`CURRENT_TIMESTAMP`)
});

export const passwordResetTokens = mysqlTable('password_reset_tokens', {
	id: varchar('id', { length: 36 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
	token: varchar('token', { length: 255 }).notNull().unique(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const sessions = mysqlTable('sessions', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id),
	sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
	passwordResetTokens: many(passwordResetTokens),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const passwordResetTokensRelations = relations(passwordResetTokens, ({ one }) => ({
	user: one(users, {
		fields: [passwordResetTokens.userId],
		references: [users.id],
	}),
}));

export type User = typeof users.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type Session = typeof sessions.$inferSelect;

export type NewUser = typeof users.$inferInsert;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;
export type NewSession = typeof sessions.$inferInsert;

