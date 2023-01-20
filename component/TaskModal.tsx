import { Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Table, Tbody, Td, Tr, Text, Input, Box, Textarea, FormControl, FormLabel, } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Task } from '../hooks/useTask.hooks';
import { getCardTheme } from '../utils/task.utils';

type Props = {
  isOpen: boolean;
  onClose: () => void
  task?: Task;
  updateTask?: (active: boolean) => void
  submitNewTask?: (name: string, description?: string) => void
}
const getNoteTable = (task?: Task) => {
  if (task?.noteObject) {
    return (
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
    )
  }
}
const newTask = {
  id: '',
  name: '',
  description: '',
  inserted_at: '',
  lastUpdated: 0,
  active: true,
}
export const TaskModal = ({ isOpen, onClose, task, updateTask, submitNewTask }: Props) => {
  const [modalTask, setModalTask] = useState<Task>(task || newTask)
  const { cardColor, switchColor } = getCardTheme(modalTask?.lastUpdated)

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value
    if (value.length <= 30) setModalTask({ ...modalTask, name: event.target.value })
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event?.target?.value
    if (value.length <= 30) setModalTask({ ...modalTask, description: event.target.value })
  }
  const createNewTask = () => {
    if (modalTask.name && submitNewTask) {
      submitNewTask(modalTask.name, modalTask.description)
      onClose()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay />
      <ModalContent backgroundColor={cardColor} margin="1em">
        <ModalHeader>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={modalTask?.name}
              onChange={handleNameChange}
            />
            <FormLabel>Description</FormLabel>

            <Textarea
              value={modalTask?.description}
              onChange={handleDescriptionChange}
              placeholder='Enter some details about this task...'
              size='sm'
            />
            {updateTask && (
              <Box>
                <FormLabel >Active</FormLabel>
                <Switch colorScheme={switchColor} isChecked={modalTask?.active} onChange={() => updateTask(!modalTask?.active)} />
              </Box>)}
          </FormControl>
        </ModalHeader>
        <ModalBody>
          <HStack>
            {modalTask?.description}
            {getNoteTable(modalTask)}

          </HStack>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          {submitNewTask ? <Button onClick={createNewTask} colorScheme='blue'>Save</Button> : <Button colorScheme='whatsapp'>Save & Close</Button>}

        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}