import { Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Table, Tbody, Td, Tr, Text, Input, Textarea, FormControl, FormLabel, } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Task } from '../hooks/types/task';
import { getCardTheme } from '../utils/task.utils';

type Props = {
  isOpen: boolean;
  onClose: () => void
  task?: Task;
  updateTask?: (task: Task) => void
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
  frequency: 0,
  inserted_at: '',
  lastUpdated: 0,
  active: true,
}
export const TaskModal = ({ isOpen, onClose, task, updateTask, submitNewTask }: Props) => {
  const [modalTask, setModalTask] = useState<Task>(task || newTask)
  const { cardColor, switchColor } = getCardTheme(modalTask?.lastUpdated)

  const updateModalTask = (value: string | boolean, key: string) => {
    setModalTask({ ...modalTask, [key]: value })
  }
  const saveAndCloseModal = () => {
    if (updateTask) {
      updateTask({ ...modalTask })
      onClose();
    }
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
            <FormLabel color={'blackAlpha.500'} fontWeight='bold'>Name</FormLabel>
            <Input
              value={modalTask?.name}
              onChange={(event) => updateModalTask(event?.target?.value, 'name')}
            />
            <FormLabel color={'blackAlpha.500'} fontWeight='bold'>Description</FormLabel>
            <Textarea
              value={modalTask?.description}
              onChange={(event) => updateModalTask(event?.target?.value, 'description')}
              placeholder='Enter some details about this task...'
              size='sm'
            />
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
          {submitNewTask ? <Button onClick={createNewTask} colorScheme='whatsapp'>Save</Button> : <Button colorScheme='whatsapp' onClick={saveAndCloseModal}>Save & Close</Button>}

        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}