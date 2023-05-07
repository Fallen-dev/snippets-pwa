import { AuthApiError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const signupSchema = z.object({
	email: z.string().min(1, {message: 'Email is required.'}).email({ message: 'Must be a proper email.' }),
	password: z.string().min(1, {message: 'Password is required.'}).min(6, { message: 'Password must be at least 6 characters.' }).trim()
});

export const actions = {
	async default({ request, locals }) {
		const data = Object.fromEntries(await request.formData()) as {email: string, password: string};

		try {
			const {email, password} = signupSchema.parse(data);
			const {data: signinData, error} = await locals.db.auth.signInWithPassword({email, password})

			console.log('Signin data:', signinData);
			console.log('error:', error);
			

			if (error) {
				if (error instanceof AuthApiError && +error.status === 400)
					return fail(400, {errors: {message: error.message}})
				return fail(500, {errors: {message: '<h6>Something went wrong.</h6><p>Try again later.</p>'}})
			}
		}
		catch (error: any) {
			return fail(400, {
				data,
				errors: error.flatten().fieldErrors
			})
		}
		throw redirect(302, '/?signin=success')
	}
};
