import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Flex, Heading, VStack, Button, HStack, Box } from '@chakra-ui/react'
import Main from '../component/Main'
import { useState } from 'react'
import Account from '../component/Account'
import { useGSDContext } from '../context/context'

const Home = () => {
  // const session = useSession()
  const supabase = useSupabaseClient()
  const { session, user } = useGSDContext()
  console.log(session, user);

  return (
    <Flex alignItems="start" justifyContent="center" background="blackAlpha.900" height="100%">
      <Flex direction="column" padding="10">
        <VStack spacing={2}>
          <HStack>
            <Heading as='h1' size="xl">GSD list</Heading>
            {session && <Account session={session} />}
          </HStack>
          <Box width="70%">
            <Heading as='h3' size='sm'>A simple web app to help you Get Stuff Done.</Heading>
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
