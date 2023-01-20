import { StackDivider, VStack, } from '@chakra-ui/react'
import React from 'react'
import { Task } from '../hooks/useTask.hooks'
import { TaskCard } from './TaskCard'

type Props = {
  taskList: Task[],
  addTaskNote: (taskId: string, note: string) => Promise<void>
  updateTask: (task: Task) => void;
}

export const TaskList = ({ taskList, addTaskNote, updateTask }: Props) => {
  return (
    <VStack
      align='stretch'
      divider={<StackDivider borderColor='gray.200' />}
      spacing={3}
      width="100%"
      paddingTop="4"
      height="80vh" overflow={'scroll'}
    >
      {
        taskList.map((task) => {
          // const updateTask = (active: boolean) => setActive(task.id, active)
          return (<TaskCard key={task.id} task={task} addNote={addTaskNote} updateTask={updateTask} />)
        })
      }
    </VStack>
  )
}