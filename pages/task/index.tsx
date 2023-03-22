import React, { useEffect } from 'react'

import { Button, VStack, Skeleton, HStack, useDisclosure } from '@chakra-ui/react'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { useGSDContext } from '../../context/context'
import { TaskModal } from '../../component/TaskModal'
import { ControlBar } from '../../component/ControlBar'
import { TaskList } from '../../component/Task/TaskList'
import { FrequencyEnum } from '../../hooks/types/task'
import { BreadCrumb } from '../../component/BreadCrumb'
import { TaskNode, TaskTree } from '../../component/TaskTree'
const elements: TaskNode[] = [
  { id: 'da2c5ba5-407e-4065-a5d5-8a9c9b3a3b11', parent_id: null, name: 'Root 1' },
  { id: 'bbd60a16-9c9d-4f02-9075-5a5d5bbf6215', parent_id: 'da2c5ba5-407e-4065-a5d5-8a9c9b3a3b11', name: 'Child 1 of Root 1' },
  { id: 'aed8891f-57e4-4d8d-8ec3-812a7c3b9039', parent_id: 'da2c5ba5-407e-4065-a5d5-8a9c9b3a3b11', name: 'Child 2 of Root 1' },
  { id: '868f7dcb-6a69-4c39-a4e4-c8a3564b1185', parent_id: 'bbd60a16-9c9d-4f02-9075-5a5d5bbf6215', name: 'Grandchild 1 of Child 1 of Root 1' },
  { id: '1f90186e-34b5-4b9f-af96-bc8d0a0b1283', parent_id: 'aed8891f-57e4-4d8d-8ec3-812a7c3b9039', name: 'Grandchild 2 of Child 2 of Root 1' },
  { id: 'e2710ab3-82d3-48f2-94b2-2e5a0f369b99', parent_id: null, name: 'Root 2' },
  { id: '5fcbbca5-5d50-4a5d-90e4-1204f61ab7d4', parent_id: 'e2710ab3-82d3-48f2-94b2-2e5a0f369b99', name: 'Child 1 of Root 2' },
  { id: 'd2ed7ca9-2f75-43f1-a1c3-1e36e3ec3e8c', parent_id: 'e2710ab3-82d3-48f2-94b2-2e5a0f369b99', name: 'Child 2 of Root 2' },
  { id: '0a274f0d-f3b3-4c99-ae6b-e9983075d5e5', parent_id: '5fcbbca5-5d50-4a5d-90e4-1204f61ab7d4', name: 'Grandchild 1 of Child 1 of Root 2' },
  { id: '53c9e3e3-3c89-4150-8f0e-af1a7e77c86f', parent_id: 'd2ed7ca9-2f75-43f1-a1c3-1e36e3ec3e8c', name: 'Grandchild 2 of Child 2 of Root 2' },
]

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
      {/* <TaskTree elements={elements} /> */}
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