import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Code, Input, Spinner, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useGSDContext } from '../../context/context'
import { useProfile } from '../../hooks/useProfile.hooks'

type Props = {}

const ToDo = (props: Props) => {
  const { addToDo, getToDoList, user, session } = useGSDContext()
  const supabase = useSupabaseClient()

  const { account, loading, signOut } = useProfile(session)
  if (loading) return <Spinner />
  return (
    <VStack paddingTop={4}>
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Account</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Text size="md">
        Add something you want to do more of, and update it whenever you complete the task. <br />
        If you have updated a task in the last 24 hours your card <Code colorScheme='green' children="will be green" /> if you have a task that hasn't been updated in over 24 <Code colorScheme='yellow' children="will be yellow" /> if it's been more than 3 days <Code colorScheme='red' children="will be red" />

      </Text>
      <Stack spacing={3}>
        <Text mb='8px'>Email: {account.email}</Text>
        <Input
          placeholder='Username'
          size='sm'
          variant='outline'
          isDisabled
          value={account.username}
        />
        <Input
          placeholder='Website'
          size='sm'
          variant='outline'
          isDisabled
          value={account.email}
        />
        <Button onClick={signOut}>Sign Out</Button>
      </Stack>
    </VStack>
  )
}

export default ToDo