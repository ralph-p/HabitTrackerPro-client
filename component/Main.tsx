import React from 'react'
import { useTask } from '../hooks/useTask.hooks'
import { Button, VStack, Skeleton, HStack, useDisclosure } from '@chakra-ui/react'
import { TaskList } from './TaskList'
import { AddInput } from './AddInput'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { ControlBar } from './ControlBar'
import { TaskModal } from './TaskModal'

type Props = {}

const Main = (props: Props) => {
  const {
    taskList,
    addTask,
    addTaskNote,
    updateSort,
    newestFist,
    loading,
    controlValue,
    setControlValue,
    updateTask,
  } = useTask()
  const submitNewTask = (task: string, description?: string) => addTask(task, description)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <VStack paddingTop={4}>
      <HStack>
        <TaskModal isOpen={isOpen} onClose={onClose} submitNewTask={submitNewTask} />
        <Button onClick={onOpen}>Add Task</Button>
        <Button size="sm" onClick={updateSort} colorScheme='teal'>{newestFist ? <ArrowDownIcon /> : <ArrowUpIcon />}</Button>
      </HStack>
      <ControlBar value={controlValue} setValue={setControlValue} />
      {!loading ? <TaskList taskList={taskList} addTaskNote={addTaskNote} updateTask={updateTask} /> : <Skeleton height='100vh' />}
    </VStack >
  )
}

export default Main