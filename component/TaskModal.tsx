import { Button, HStack, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Table, Tbody, Td, Tr, Text, Input, Textarea, FormControl, FormLabel, NumberInput, NumberInputField, Select, } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FrequencyEnum, Task } from '../hooks/types/task';
import { getCardTheme } from '../utils/task.utils';
import { TimeInput } from './TimeInput';

type Props = {
  isOpen: boolean;
  onClose: () => void
  submitNewTask?: (name: string, description?: string, duration?: number, frequency?: FrequencyEnum) => void
}

const newTask = {
  id: '',
  name: '',
  description: '',
  frequency: FrequencyEnum.DAILY,
  inserted_at: '',
  lastUpdated: 0,
  active: true,
  duration: 0,
  amountDone: 0,
}
export const TaskModal = ({ isOpen, onClose, submitNewTask }: Props) => {
  const [modalTask, setModalTask] = useState<Task>(newTask)

  const updateModalTask = (value: string | boolean, key: string) => {
    setModalTask({ ...modalTask, [key]: value })
  }
  const createNewTask = () => {
    if (modalTask.name && submitNewTask) {
      submitNewTask(modalTask.name, modalTask.description, modalTask?.duration, modalTask.frequency)
      setModalTask(newTask)
      onClose()
    }
  }
  const setMinuteValue = (value: number) => {
    setModalTask({ ...modalTask, duration: value })

  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay />
      <ModalContent margin="1em">
        <ModalHeader>
        </ModalHeader>
        <ModalBody>
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
            <FormLabel color={'blackAlpha.500'} fontWeight='bold'>Time Commitment</FormLabel>
            <TimeInput setMinuteValue={setMinuteValue} />
            <FormLabel color={'blackAlpha.500'} fontWeight='bold'>Frequency</FormLabel>
            <Select placeholder='Select...(default daily)' onChange={({ target: { value } }) => updateModalTask(value, 'frequency')}>
              <option value={0}>Daily</option>
              <option value={1}>Weekly</option>
              <option value={2}>Monthly</option>
            </Select>
          </FormControl>

        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={createNewTask} colorScheme='whatsapp'>Save</Button>

        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}