import { Button, Checkbox, Input, Spinner, Table, Tbody, Td, Textarea, Th, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGSDContext } from '../../context/context'

type Props = {}

export const SubTask = (props: Props) => {
  const { addSubtask, task } = useGSDContext();
  if (!task) return <Spinner />
  const [newSubtask, setNewSubtask] = useState({ name: '', description: '' })
  const [showNewSubtask, setShowNewSubtask] = useState(false)
  const createSubtask = () => {
    addSubtask(task?.id, newSubtask.name, newSubtask.description)
    setNewSubtask({ name: '', description: '' })
    setShowNewSubtask(false)
  }
  const updateNewSubtaskState = (value: string | boolean, key: string) => {
    setNewSubtask({ ...newSubtask, [key]: value })
  }
  return (
    <>
      {
        showNewSubtask ? (<>
          <Input
            value={newSubtask.name}
            placeholder={'Subtask name'}
            onChange={(event) => updateNewSubtaskState(event?.target?.value, 'name')}
          />
          <Textarea
            value={newSubtask.description}
            placeholder={'Subtask Description'}
            onChange={(event) => updateNewSubtaskState(event?.target?.value, 'description')}

          />
          <Button onClick={createSubtask}>Save Subtask</Button>
        </>) : <Button onClick={() => setShowNewSubtask(true)}>New Subtask</Button>
      }

      {task.subtasks && task.subtasks.length && (<Table size="sm" variant="unstyled" backgroundColor={'gray.100'} borderRadius=".5em">
        <Tbody>
          <Th>Name</Th>
          <Th>Description</Th>
          <Th>Complete</Th>
          {
            task.subtasks?.map((subtask) => (
              <Tr>
                <Td>{subtask.name}</Td>
                <Td>{subtask.description}</Td>
                <Td><Checkbox isChecked={subtask.complete} /></Td>
              </Tr>
            ))

          }
        </Tbody>
      </Table>)}
    </>
  )
}