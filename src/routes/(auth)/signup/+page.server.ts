import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const signupSchema = z.object({
	username: z.string().min(1, { message: 'Username is required' }).trim(),
	email: z
		.string()
		.min(1, { message: 'Email is required.' })
		.email({ message: 'Must be a proper email.' }),
	password: z
		.string()
		.min(1, { message: 'Password is required.' })
		.min(6, { message: 'Password must be at least 6 characters.' })
		.trim()
});

export const actions = {
	async default({ request, locals }) {
		const data = Object.fromEntries(await request.formData()) as {
			username: string;
			email: string;
			password: string;
		};

		try {
			const { email, password, username } = signupSchema.parse(data);
			const { data: signupData, error } = await locals.db.auth.signUp({
				email,
				password,
				options: { data: { username } }
			});
			console.log('signup data:', signupData);
			console.log('error:', error);

			const session = await locals.getSession() || ''
			
			if (signupData.user?.id !== session) return fail(400, {errors: {message: '<h6>Email already exists!</h6><p>Login instead or use a different email.</p>'}})

			if (error) {
				if (error instanceof AuthApiError && +error.status === 400)
					return fail(400, { errors: { message: error.message } });
				return fail(500, {
					errors: { message: '<h6>Something went wrong.</h6><p>Try again later.</p>' }
				});
			}
		} catch (error: any) {
			return fail(400, {
				data,
				errors: error.flatten().fieldErrors
			});
		}
		throw redirect(302, '/?signup=success');
	}
};
