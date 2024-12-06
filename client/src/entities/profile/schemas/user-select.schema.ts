import { z } from 'zod';

export const userSelectSchema = z.object({
	id: z.string().uuid('Invalid user ID'),
	name: z.string(),
	email: z.string().email(),
	photo: z.string().url(),
	bio: z.string(),
	role: z.enum(['user', 'admin', 'creator']),
	isVerified: z.boolean(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
	token: z.string().optional(),
});

export type UserSelectSchema = z.infer<typeof userSelectSchema>;
