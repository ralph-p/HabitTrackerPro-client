import { Flex, Spinner, VStack, Text, Table, Tbody, Tr, Td, Box, Input, Textarea, ButtonGroup, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Switch, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AddInput } from '../../component/AddInput'
import { TaskDetails } from '../../component/Task/TaskDetails'
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
}
const TaskPage = () => {
  const router = useRouter()
  const { session, user } = useGSDContext()
  const { id } = router.query
  const taskId = id as string;
  const { getTask, task, addTaskNote, updateTask } = useTaskControl(taskId)
  const submitNote = (note: string, time?: string) => addTaskNote(taskId, note, time)
  const [taskState, setTaskState] = useState<Task>(newTask)
  const [readOnly, setReadOnly] = useState(true)
  const updateStateTask = (value: string | boolean, key: string) => {
    setTaskState((currentTaskState) => ({ ...currentTaskState, [key]: value }))
  }
  useEffect(() => {
    if (user && user.id && id) {
      getTask()
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
  if (!session) {
    return <Spinner />
  }
  return task && (
    <VStack spacing={2}>
      <Breadcrumb fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem>
          <BreadcrumbLink href='/'>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='/task'>Task List</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{task.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack width={"100%"} spacing={3}>
        <TaskDetails task={taskState} readOnly={readOnly} updateTask={updateStateTask} />
        {readOnly ? <Button onClick={editOnClick} colorScheme="facebook">Edit</Button> : (
          <ButtonGroup>
            <Button onClick={resetState} colorScheme='red'>Cancel</Button>
            <Button onClick={() => updateTask({ ...taskState })}  colorScheme='whatsapp'>Save</Button>
          </ButtonGroup>
        )}
        <AddInput callBack={submitNote} placeholder={`${task.name} note`} />
      </VStack>
      <Table size="sm" variant="unstyled" backgroundColor={'gray.100'} borderRadius=".5em">
        <Tbody>
          {
            Object.entries(task?.noteObject as { date: string[] }).map((date, index) => {
              return (
                <Tr key={`${date[0]} - ${index}`}>
                  <Td display="flex"><Text color={'blackAlpha.700'}>{date[0]}</Text></Td>
                  <Td>
                    {date[1].map((note, index) => (
                      <Tr key={`${date[0]} - ${note} - ${index}`}>
                        <Text color={'blackAlpha.600'}>{note}</Text>
                      </Tr>
                    ))}
                  </Td>
                </Tr>
              );
            })

          }
        </Tbody>
      </Table>
    </VStack>
  )
}

export default TaskPage
