import { baseApi } from '@shared/api';
import { z } from 'zod';
import {
	userSelectSchema,
	UserSelectSchema,
	userUpdateSchema,
	UserUpdateSchema,
} from '../schemas';

const USER_TAG = 'User';

export const {
	endpoints: profileEndpoints,
	useRegisterUserMutation,
	useLoginUserMutation,
	useUserSelectQuery,
	useLazyUserSelectQuery,
	useLogoutUserMutation,
	useUserUpdateMutation,
	useChangePasswordMutation,
} = baseApi.enhanceEndpoints({ addTagTypes: [USER_TAG] }).injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		registerUser: builder.mutation<
			UserSelectSchema,
			{ name: string; email: string; password: string }
		>({
			invalidatesTags: [USER_TAG],
			query: body => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
			transformResponse: response => userSelectSchema.parse(response),
		}),

		loginUser: builder.mutation<
			{ token: string },
			{ email: string; password: string }
		>({
			query: body => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
			transformResponse: response =>
				z.object({ token: z.string() }).parse(response),
		}),

		userSelect: builder.query<UserSelectSchema, void>({
			providesTags: [USER_TAG],
			query: () => ({
				url: '/auth/user',
				method: 'GET',
			}),
			transformResponse: response => userSelectSchema.parse(response),
		}),

		logoutUser: builder.mutation<void, void>({
			invalidatesTags: [USER_TAG],
			query: () => ({
				url: '/auth/logout',
				method: 'GET',
			}),
		}),

		userUpdate: builder.mutation<UserSelectSchema, UserUpdateSchema>({
			invalidatesTags: [USER_TAG],
			query: body => ({
				url: '/auth/user',
				method: 'PATCH',
				body: userUpdateSchema.parse(body),
			}),
			transformResponse: response => userSelectSchema.parse(response),
		}),

		changePassword: builder.mutation<
			void,
			{ currentPassword: string; newPassword: string }
		>({
			invalidatesTags: [USER_TAG],
			query: body => ({
				url: '/auth/change-password',
				method: 'POST',
				body: z
					.object({
						currentPassword: z.string().min(6, 'Current password is too short'),
						newPassword: z.string().min(6, 'New password is too short'),
					})
					.parse(body),
			}),
		}),
	}),
});
