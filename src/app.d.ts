// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import {Session, SupabaseClient} from '@supabase/supabase-js'


declare global {
	interface Snippet {
		id: string
		user: string;
		language?: string;
		code: string;
		tags?: string[]
		date: number|string;
	}
	// interface Error {}
	// interface Platform {}
	namespace App {
		interface Locals {
			db: SupabaseClient; 
			getSession: () => Promise<Session|null>
		}
	}
	interface PageData {
		session: Session | null
	}
}
