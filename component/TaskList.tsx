import { StackDivider, VStack, } from '@chakra-ui/react'
import React from 'react'
import { Task } from '../hooks/useTask.hooks'
import { TaskCard } from './TaskCard'

type Props = {
  taskList: Task[],
  addTaskNote: (taskId: string, note: string) => Promise<void>
  setActive: (id: string, active: boolean) => void;
}

export const TaskList = ({ taskList, addTaskNote, setActive }: Props) => {
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
          const updateTask = (active: boolean) => setActive(task.id, active)
          return (<TaskCard key={task.id} task={task} addNote={addTaskNote} updateTask={updateTask} />)
        })
      }
    </VStack>
  )
}