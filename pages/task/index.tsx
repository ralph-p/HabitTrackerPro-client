import React, { useEffect } from 'react'

import { Button, VStack, Skeleton, HStack, useDisclosure } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useGSDContext } from '../../context/context'
import { TaskModal } from '../../component/TaskModal'
import { ControlBar } from '../../component/ControlBar'
import { TaskList } from '../../component/Task/TaskList'
import { FrequencyEnum } from '../../hooks/types/task'
import { BreadCrumb } from '../../component/BreadCrumb'


const TaskPage = () => {
  const { addTask, loading, newestFist, updateSort, user, getTaskList, controlValue } = useGSDContext()
  const navItems = [{ link: '/', name: 'Home' }, { name: 'Task' }]

  const submitNewTask = (task: string, description?: string, duration?: number, frequency?: FrequencyEnum) => addTask(task, description, duration, frequency)
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (user && user?.id) {
      getTaskList()
    }
  }, [user, controlValue, newestFist])
  if (!user) return <Skeleton />
  return (
    <VStack paddingTop={4}>
      <BreadCrumb items={navItems} />
      <HStack>
        <TaskModal isOpen={isOpen} onClose={onClose} submitNewTask={submitNewTask} />
        <Button onClick={onOpen} colorScheme="facebook">Add Task</Button>
        <Button size="sm" onClick={updateSort} colorScheme='teal'>{newestFist ? <ArrowDownIcon /> : <ArrowUpIcon />}</Button>
      </HStack>
      <ControlBar />
      <TaskList />
    </VStack >
  )
}

export default TaskPage