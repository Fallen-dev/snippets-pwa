import { error, redirect } from '@sveltejs/kit'

export const POST = async ({locals}) => {
  const session = await locals.getSession()
  if (session) {
    const {error: err} = await locals.db.auth.signOut()
    
    if (err) throw error(500, 'Something went wrong')
    
    throw redirect(303, '/')
  }
  return new Response
}