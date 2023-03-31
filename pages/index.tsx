import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { VStack, Button } from '@chakra-ui/react'
import { useGSDContext } from '../context/context'
import LoginForm from '../component/Login'

const Home = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()
  const { session } = useGSDContext()

  return (
    <>
      {!session ? (
        <LoginForm />
      ) : (
        <VStack spacing={3} alignItems={'normal'} padding="2em">
          <Button as={'a'} href="/task" colorScheme="facebook">Get Stuff Done</Button>
          <Button as={'a'} href="/account" colorScheme="facebook">Account</Button>
        </VStack>
      )}
    </>
  )
}

export default Home
