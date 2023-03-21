import { Button, Input, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BreadCrumb } from '../../component/BreadCrumb'
import { useGSDContext } from '../../context/context'
import { useProfile } from '../../hooks/useProfile.hooks'

type Props = {}
const navItems = [{ link: '/', name: 'Home' }, { name: 'Account' }]

const Account = (props: Props) => {
  const { session } = useGSDContext()

  const { account, loading, signOut } = useProfile(session)
  if (loading) return <Spinner />
  return (
    <VStack paddingTop={4}>
      <BreadCrumb items={navItems} />


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

export default Account