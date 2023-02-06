import { Flex, Spinner, VStack, Text, Table, Tbody, Tr, Td, Box, Input, Textarea, ButtonGroup, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AddInput } from '../../component/AddInput'
import { useGSDContext } from '../../context/context'
import { Task, useTaskControl } from '../../hooks/useTask.hooks'

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
  const { session, user, addTaskNote, updateTask } = useGSDContext()
  const { id } = router.query
  const {getTask, task} = useTaskControl(id as string)
  const submitNote = (note: string) => addTaskNote(id as string, note)
  const [taskState, setTaskState] = useState<Task>(task || newTask)
  const updateStatelTask = (value: string | boolean, key: string) => {
    setTaskState({ ...taskState, [key]: value })
  }
  useEffect(() => {
    if(user && user.id && id) {
      getTask()
    } 
  }, [user, id])
  useEffect(() => {
    setTaskState(task)
  }, [task])
  
  if (!session) {
    return <Spinner />
  }
  
  return task && (
        <VStack spacing={2}>
          <VStack width={"100%"} spacing={3}>
          <Textarea
              value={taskState?.name}
              onChange={(event) => updateStatelTask(event?.target?.value, 'name')}
              color="blackAlpha.700"
              borderColor={'facebook.900'}
            />

            <Textarea
              value={taskState?.description}
              onChange={(event) => updateStatelTask(event?.target?.value, 'description')}
              placeholder='Enter some details about this task...'
              color="blackAlpha.700"
              borderColor={'facebook.900'}
              size='sm'
            />
            <ButtonGroup><Button>Edit</Button><Button>Save</Button></ButtonGroup>
          <AddInput callBack={submitNote} placeholder={`${task.name} note`} />
          </VStack>
          <Table size="sm" variant="unstyled" backgroundColor={'gray.100'} borderRadius=".5em">
            <Tbody>
              {
                Object.entries(task?.noteObject).map((date, index) => {
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
