import { AddIcon } from '@chakra-ui/icons'
import { Button, Checkbox, Container, Input, Spinner, Table, Tbody, Td, Text, Textarea, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGSDContext } from '../../context/context'
import TaskNoteModal from './TaskNoteModal'

type Props = {}

export const SubTask = (props: Props) => {
  const { addSubtask, task, updateSubtask } = useGSDContext();
  if (!task) return <Spinner />
  const [newSubtask, setNewSubtask] = useState({ name: '', description: '' })
  const [showNewSubtask, setShowNewSubtask] = useState(false)
  const [noteTaskName, setNoteTaskName] = useState('')
  const createSubtask = () => {
    addSubtask(task?.id, newSubtask.name, newSubtask.description)
    setNewSubtask({ name: '', description: '' })
    setShowNewSubtask(false)
  }
  const updateNewSubtaskState = (value: string | boolean, key: string) => {
    setNewSubtask({ ...newSubtask, [key]: value })
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const openNoteModal = (subtaskName: string) => {
    setNoteTaskName(subtaskName)
    onOpen();
  }
  const closeNoteModal = () => {
    setNoteTaskName('')
    onClose();
  }

  return (
    <>
      {/* Need the conditional render so the modal's use effect sets the input value to the subtask name */}
      {isOpen && <TaskNoteModal isOpen={isOpen} onClose={closeNoteModal} noteString={noteTaskName} />}
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
        </>) : <><Button onClick={() => setShowNewSubtask(true)}>New Subtask</Button> <Button onClick={() => openNoteModal('')}>Add Note</Button></>
      }
      <Container>
        <Table size="md" variant="simple" backgroundColor={'gray.100'} borderRadius=".5em" overflow={'scroll'}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Add Note</Th>
            </Tr>
          </Thead>
          <Tbody >

            {
              task.subtasks?.map((subtask) => (
                <Tr key={`${subtask.id}`}>
                  <Td  cursor={'pointer'} onClick={() => {updateSubtask(task.id, subtask.id, !subtask.complete)}}><Text as={subtask.complete ? 's' : 'b'}>{subtask.name}</Text></Td>
                  <Td>{!subtask.complete && (<Text as='sub'>{subtask.description}</Text>)}</Td>
                  <Td>{!subtask.complete && (<AddIcon boxSize={3} onClick={() => openNoteModal(subtask.name)} cursor="pointer" />)}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </Container>
    </>
  )
}