import { StackDivider, VStack, } from '@chakra-ui/react'
import React from 'react'
import { Task } from '../hooks/useResolution.hooks'
import { TaskCard } from './TaskCard'

type Props = { taskList: Task[], addResolutionNote: (taskId: string, note: string) => Promise<void> }

export const TaskList = ({ taskList, addResolutionNote }: Props) => {
  return (
    <VStack
      align='stretch'
      divider={<StackDivider borderColor='gray.200' />}
      spacing={3}
      width="100%"
      paddingTop="4"
      overflow='scroll'
    >
      {
        taskList.map((task) => {
          return (<TaskCard key={task.id} task={task} addNote={addResolutionNote} />)
        })
      }
    </VStack>
  )
}