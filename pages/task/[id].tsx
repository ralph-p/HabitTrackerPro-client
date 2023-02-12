import { Flex, Spinner, VStack, Text, Table, Tbody, Tr, Td, Box, Input, Textarea, ButtonGroup, Button, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Switch, HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AddInput } from '../../component/AddInput'
import { useGSDContext } from '../../context/context'
import { Task, useTaskControl } from '../../hooks/useTask.hooks'
import { lastUpdated } from '../../utils/task.utils'

type Props = {}
const newTask = {
  id: '',
  name: '',
  description: '',
  inserted_at: '',
  lastUpdated: 0,
  active: true,
}
const TaskPage = (props: Props) => {
  const router = useRouter()
  const { session, user } = useGSDContext()
  const { id } = router.query
  const taskId = id as string;
  const { getTask, task, addTaskNote, updateTask } = useTaskControl(taskId)
  const submitNote = (note: string, time?: string) => addTaskNote(taskId, note, time)
  const [taskState, setTaskState] = useState<Task>(newTask)
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

  if (!session) {
    return <Spinner />
  }
  return task && (
    <VStack spacing={2}>
      <VStack width={"100%"} spacing={3}>
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
        <Textarea
          value={taskState?.name}
          onChange={(event) => updateStateTask(event?.target?.value, 'name')}
          color="blackAlpha.700"
          borderColor={'facebook.900'}
        />

        <Textarea
          value={taskState?.description}
          onChange={(event) => updateStateTask(event?.target?.value, 'description')}
          placeholder='Enter some details about this task...'
          color="blackAlpha.700"
          borderColor={'facebook.900'}
          size='sm'
        />
        <Text>Duration: {taskState.duration}</Text>
        <Text>{lastUpdated(taskState.lastUpdated)}</Text>
        <HStack>
          <Text color={'blackAlpha.500'} fontWeight='bold'>Active</Text>
          <Switch isChecked={taskState?.active} onChange={() => updateStateTask(!taskState?.active, 'active')} />

        </HStack>
        <ButtonGroup><Button>Edit</Button><Button onClick={() => updateTask({ ...taskState })}>Save</Button></ButtonGroup>
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
