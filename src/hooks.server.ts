import { PUBLIC_ANON_KEY, PUBLIC_URL } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';

export const handle = async ({ event, resolve }) => {
	event.locals.db = createSupabaseServerClient({
		supabaseUrl: PUBLIC_URL,
		supabaseKey: PUBLIC_ANON_KEY,
		event
	});
	
	event.locals.getSession = async () => {
		const {data: {session}} = await event.locals.db.auth.getSession()
		return session
	}
	
	return resolve(event, {
		filterSerializedResponseHeaders(name: string) {
			return name === 'content-range';
		}
	});
};
