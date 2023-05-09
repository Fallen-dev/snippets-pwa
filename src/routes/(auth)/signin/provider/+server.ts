import { redirect } from '@sveltejs/kit'

export const POST = async (event) => {
  const provider = event.url.searchParams.get('provider') as 'google'|'apple'|'github'
  
  if (!provider) {
    if(event.url.searchParams.has('signup')){
      throw redirect(302, '/signup?oauth-failed=Falsey search provider')
    }
    if(event.url.searchParams.has('signin')){
      throw redirect(302, '/signin?oauth-failed=Falsey search provider')
    }
  }
  
  const {data, error} = await event.locals.db.auth.signInWithOAuth({provider, options: {redirectTo: `${event.url.origin}/?signin=success`}})

  if (data.url)
  throw redirect(303, data.url)

  return new Response('<h2>Hello</h2>')
}