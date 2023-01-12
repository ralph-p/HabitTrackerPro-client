import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Flex, Heading, VStack } from '@chakra-ui/react'
import Main from '../component/Main'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" background="blackAlpha.900">
      <Flex direction="column" padding="10">
        <VStack spacing={2}>
          <Heading as='h1' size="xl">Resolution tracker</Heading>
          <Heading as='h3' size='md'>A simple web app to help you keep track of your various resolutions</Heading>
        </VStack>
        {!session ? (
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
        ) : (
          <Main />
        )}
      </Flex>
    </Flex>
  )
}

export default Home
