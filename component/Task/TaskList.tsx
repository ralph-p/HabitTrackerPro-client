import { Box, StackDivider, VStack, } from '@chakra-ui/react'
import React from 'react'
import { useGSDContext } from '../../context/context'
import { TaskCard } from './TaskCard'

export const TaskList = () => {
  const { taskList, addTaskNote, updateTask } = useGSDContext()
  return (
    <VStack
      align='stretch'
      divider={<StackDivider borderColor='gray.200' />}
      spacing={3}
      width="100%"
      paddingTop="4"
      height="70vh" 
      overflow={'scroll'}
    >
      {
        taskList?.map((task) => {
          return (<TaskCard key={task.id} task={task} />)
        })
      }
      <Box />
    </VStack>
  )
}