import React, { useEffect } from 'react'

import { Button, VStack, Skeleton, HStack, useDisclosure } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useGSDContext } from '../../context/context'
import { TaskModal } from '../../component/TaskModal'
import { ControlBar } from '../../component/ControlBar'
import { TaskList } from '../../component/Task/TaskList'

type Props = {}

const TaskPage = (props: Props) => {
  const { addTask, loading, newestFist, updateSort, user, getTaskList, controlValue } = useGSDContext()

  const submitNewTask = (task: string, description?: string) => addTask(task, description)
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {  
    if (user && user?.id) {
      getTaskList()
    }
  }, [user, controlValue])
  return (
    <VStack paddingTop={4}>
      <HStack>
        <TaskModal isOpen={isOpen} onClose={onClose} submitNewTask={submitNewTask} />
        <Button onClick={onOpen}  colorScheme="facebook">Add Task</Button>
        <Button size="sm" onClick={updateSort} colorScheme='teal'>{newestFist ? <ArrowDownIcon /> : <ArrowUpIcon />}</Button>
      </HStack>
      <ControlBar />
      <TaskList />
    </VStack >
  )
}

export default TaskPage