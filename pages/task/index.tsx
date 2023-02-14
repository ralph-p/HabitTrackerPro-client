import React, { useEffect } from 'react'

import { Button, VStack, Skeleton, HStack, useDisclosure, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useGSDContext } from '../../context/context'
import { TaskModal } from '../../component/TaskModal'
import { ControlBar } from '../../component/ControlBar'
import { TaskList } from '../../component/Task/TaskList'

const TaskPage = () => {
  const { addTask, loading, newestFist, updateSort, user, getTaskList, controlValue } = useGSDContext()

  const submitNewTask = (task: string, description?: string) => addTask(task, description)
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    if (user && user?.id) {
      getTaskList()
    }
  }, [user, controlValue, newestFist])
  if (!user) return <Skeleton />
  return (
    <VStack paddingTop={4}>
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Task List</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
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