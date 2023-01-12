import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Flex, Heading, VStack, Button, HStack, Box } from '@chakra-ui/react'
import Main from '../component/Main'
import { useState } from 'react'
import Account from '../component/Account'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [showAccount, setShowAccount] = useState<boolean>(false)

  return (
    <Flex height="100vh" alignItems="start" justifyContent="center" background="blackAlpha.900">
      <Flex direction="column" padding="10">
        <VStack spacing={2}>
          <HStack>
            <Heading as='h1' size="xl">Resolution tracker</Heading>
            {session && <Account session={session} />}
          </HStack>
          <Box width="70%">
            <Heading as='h3' size='sm'>A simple web app to help you keep track of your various resolutions</Heading>
          </Box>
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
