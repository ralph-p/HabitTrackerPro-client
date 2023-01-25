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
  const { session } = useGSDContext()

  return (
    <>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <VStack spacing={3} alignItems={'normal'} padding="2em">
          <Button as={'a'} href="/task" colorScheme="facebook">List of things you want to do more often</Button>
          <Button as={'a'} href="/todo" colorScheme="facebook">List of things you want to get done</Button>
        </VStack>
      )}
    </>
  )
}

export default Home
