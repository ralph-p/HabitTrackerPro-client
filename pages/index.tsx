import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Main from '../component/Main'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <Main />
      )}
    </div>
  )
}

export default Home
