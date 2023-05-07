export const actions = {
	async addSnippet(event) {
		const data = Object.fromEntries(await event.request.formData()) as {
			user: string;
			code: string;
			language: string;
			tags: string;
		};
		const session = await event.locals.getSession();

		const {error, data: s} = await event.locals.db.from('snippets').insert({
		  id: session?.user.id,
		  user: data.user,
		  code: data.code,
		  language: data.language,
		  tags: data.tags.split(',') || ['Plaintext']
		})

		return {error, submitted: true};
	}
};

export const load = async (event) => {
	const snippets = event.locals.db.from('snippets').select('*');

	return {
		snippets
	};
};
