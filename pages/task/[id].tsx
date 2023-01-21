import { Flex, Spinner, VStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useGSDContext } from '../../context/context'

type Props = {}

const TaskPage = (props: Props) => {
  const { session, user } = useGSDContext()
  const router = useRouter()
  if (!session) {
    return <Spinner />
  }
  const { id } = router.query
  return (
    <Flex alignItems="start" justifyContent="center" background="blackAlpha.900" height="100%">
      <Flex direction="column" padding="10">
        <VStack spacing={2}>
          <Text>{id}</Text>
        </VStack>
      </Flex>
    </Flex>
  )
}

export default TaskPage
