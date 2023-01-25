import { Flex, Spinner, VStack, Text, Table, Tbody, Tr, Td, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AddInput } from '../../component/AddInput'
import { useGSDContext } from '../../context/context'

type Props = {}

const TaskPage = (props: Props) => {
  const router = useRouter()
  const { session, user, taskList, addTaskNote } = useGSDContext()
  const { id } = router.query
  const submitNote = (note: string) => addTaskNote(id as string, note)

  if (!session) {
    return <Spinner />
  }
  const task = taskList.find((t) => t.id === id)
  return task && (
        <VStack spacing={2}>
          <Text>{task.name}</Text>
          <Flex width={'100%'} justifyContent='center'><AddInput callBack={submitNote} placeholder={`${task.name} note`} /></Flex>
          <Table size="sm" variant="unstyled" backgroundColor={'gray.100'} borderRadius=".5em">
            <Tbody>
              {
                Object.entries(task.noteObject).map((date, index) => {
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
