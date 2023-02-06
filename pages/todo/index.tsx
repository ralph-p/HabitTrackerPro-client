import { Box, Button, StackDivider, VStack } from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useGSDContext } from '../../context/context'

type Props = {}

const ToDo = (props: Props) => {
  const { addToDo, getToDoList, user, toDoList } = useGSDContext()
  useEffect(() => {
    if (user && user?.id) {
      getToDoList()
    }
  }, [user])
  return (
    <VStack paddingTop={4}>
      <Button onClick={() => addToDo('test', 'desc', moment().toString())}> Add ToDo</Button>
      <VStack
        align='stretch'
        divider={<StackDivider borderColor='gray.200' />}
        spacing={3}
        width="100%"
        paddingTop="4"
        height="70vh"
        overflow={'scroll'}
        overflowX="hidden"
      >
        {
          toDoList?.map((todo) => {
            return (<div>{todo.name}</div>)
          })
        }
        <Box />
      </VStack>
    </VStack>
  )
}

export default ToDo