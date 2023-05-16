import { fail } from "@sveltejs/kit";
import { z } from "zod";

	const schema = z.object({
		code: z.string().min(1, { message: 'Code block cannot be empty.' }).trim(),
		language: z.string().min(1, { message: 'You must specify the language.' })
	});
  
export const actions = {
  async default(event) {
		const input = Object.fromEntries(await event.request.formData()) as {
      code: string; language: string; title?: string
    }
      const title = input?.title
	try {
			const { code, language } = schema.parse(input);
			console.log('success');
			console.table({ code, language, title });
		} catch (error: any) {
      return fail(400, {
        input, error: error.flatten().fieldErrors as {code: any, language: any} | any
      })
		}
    return {input, title}
  }
}