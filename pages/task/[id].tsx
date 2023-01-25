import { Flex, Spinner, VStack, Text, Table, Tbody, Tr, Td } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useGSDContext } from '../../context/context'

type Props = {}

const TaskPage = (props: Props) => {
  const { session, user, taskList } = useGSDContext()
  const router = useRouter()
  if (!session) {
    return <Spinner />
  }
  const { id } = router.query
  const task = taskList.find((t) => t.id === id)
  console.log(taskList);

  return task && (
    <Flex alignItems="start" justifyContent="center" background="blackAlpha.900" height="100%">
      <Flex direction="column" padding="10">
        <VStack spacing={2}>
          <Text>{id}</Text>
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
      </Flex>
    </Flex>
  )
}

export default TaskPage
