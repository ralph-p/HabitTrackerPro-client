import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Code, Input, Spinner, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React from 'react'
import { useGSDContext } from '../../context/context'
import { useProfile } from '../../hooks/useProfile.hooks'

type Props = {}

const ToDo = (props: Props) => {
  const { session } = useGSDContext()
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