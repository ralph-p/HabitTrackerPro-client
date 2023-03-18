import { Flex, Spinner, VStack, Text, Table, Tbody, Tr, Td, Box, Input, Textarea, ButtonGroup, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Switch, HStack, Checkbox } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AddInput } from '../../component/AddInput'
import { BreadCrumb } from '../../component/BreadCrumb'
import { SubTask } from '../../component/Task/SubTask'
import { TaskDetails } from '../../component/Task/TaskDetails'
import { TaskNotes } from '../../component/Task/TaskNotes'
import { useGSDContext } from '../../context/context'
import { Frequency, Task } from '../../hooks/types/task'
import { useTaskControl } from '../../hooks/useTask.hooks'
import { lastUpdated } from '../../utils/task.utils'

const newTask = {
  id: '',
  name: '',
  description: '',
  inserted_at: '',
  lastUpdated: 0,
  active: true,
  frequency: 0,
  percentComplete: 0,
  duration: 0,
}
const navItems = [{ link: '/', name: 'Home' }, { link: '/task', name: 'Task' }]
const TaskPage = () => {
  const router = useRouter()
  const { session, user } = useGSDContext()
  const { id } = router.query
  const taskId = id as string;
  const { getTask, task, addTaskNote, updateTask, addSubtask } = useGSDContext()
  const submitNote = (note: string, time?: string) => addTaskNote(taskId, note, time)
  const [taskState, setTaskState] = useState<Task>(newTask)
  const [readOnly, setReadOnly] = useState(true)
  const updateStateTask = (value: number | string | boolean, key: string) => {
    setTaskState((currentTaskState) => ({ ...currentTaskState, [key]: value }))
  }
  useEffect(() => {
    if (user && user.id && id && taskState.id === '') {
      getTask(taskId)
    }
  }, [user, id])
  useEffect(() => {
    if (task) setTaskState(task)
  }, [task])
  const editOnClick = () => {
    setReadOnly((prevState) => !prevState)
  }
  const resetState = () => {
    if (task) setTaskState(task)
    setReadOnly((prevState) => !prevState)
  }
  const saveTask = () => {
    updateTask({ ...taskState }).then(() => setReadOnly(true))
  }
  if (!session) {
    return <Spinner />
  }
  return task && (
    <VStack
      spacing={2}
      maxW="90%"
      height="80vh"
      overflow={'scroll'}
      overflowX="hidden"
    >
      <BreadCrumb items={navItems} />
      <TaskDetails task={taskState} readOnly={readOnly} updateTask={updateStateTask} />
      {readOnly ? <Button onClick={editOnClick} colorScheme="facebook">Edit</Button> : (
        <ButtonGroup>
          <Button onClick={resetState} colorScheme='red'>Cancel</Button>
          <Button onClick={saveTask} colorScheme='whatsapp'>Save</Button>
        </ButtonGroup>
      )}
      <SubTask />
      <TaskNotes />
    </VStack>
  )
}

export default TaskPage
