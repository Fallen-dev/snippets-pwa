import { PUBLIC_ANON_KEY, PUBLIC_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ data, depends, fetch }) => {
	depends('db:auth');

	const db = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_URL,
		supabaseKey: PUBLIC_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {data: {session}} = await db.auth.getSession();

	return { db, session };
};
