import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const signupSchema = z.object({
	user: z.string().min(1, { message: 'Username is required' }).trim(),
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
  async default(event) {
    const inputData =  Object.fromEntries(await event.request.formData()) as {
      user: string; email: string; password: string
    }
    
    try {
      const {email, password, user} = signupSchema.parse(inputData)

    } catch (error: any) {
      return fail(400, {
        inputData,
        error: error.flatten().fieldErrors
      })
    }

    return {
      inputData
    }
  }
}