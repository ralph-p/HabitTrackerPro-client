import { Card, CardBody, CardHeader, Heading, VStack, Text, Td, HStack, Switch, Table, Tr, Tbody, Modal, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Task, TaskNote } from '../hooks/useTask.hooks';
import moment from "moment"
import { AddInput } from './AddInput';
import { getCardTheme } from '../utils/task.utils';
type Props = {
  task: Task;
  addNote: (taskId: string, note: string) => void;
  updateTask: (active: boolean) => void
}

export const TaskCard = ({ task, addNote, updateTask }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const submitNote = (note: string) => addNote(task.id, note)
  const lastUpdated = () => {
    const duration = moment.duration(task.lastUpdated, 'minutes')
    if (duration.days() > 0) {
      return `Updated: ${duration.days()}d ${duration.hours()}h ago`
    }
    if (duration.hours() > 0) {
      return `Updated: ${duration.hours()}h ${duration.minutes()}m ago`
    }
    return `Updated: ${duration.minutes()}m ago`
  }
  const { cardColor, switchColor } = getCardTheme(task.lastUpdated)
  const getNoteTable = () => {
    if (task.noteObject) {
      return (
        <Table size="sm" variant="unstyled">
          <Tbody>
            {
              Object.entries(task.noteObject).map((date, index) => (
                <Tr key={`${date[0]} - ${index}`}>
                  <Td display="flex"><Text color={'blackAlpha.700'}>{date[0]}</Text></Td>
                  <Td>
                    {
                      date[1].map((note, index) => (
                        <Tr key={`${date[0]} - ${note} - ${index}`}>
                          <Text color={'blackAlpha.600'}>{note}</Text>
                        </Tr>
                      ))
                    }
                  </Td>
                </Tr>
              ))

            }
          </Tbody>
        </Table>
      )
    }
  }
  return (
    <Card key={`${task.name}-`} backgroundColor={cardColor} width="100%">
      <CardHeader paddingBottom={'1'}>
        <HStack justifyContent={'space-between'}>
          <Heading size="md" color="blackAlpha.800">
            {task.name}
          </Heading>
          <Text color="blackAlpha.700">Active: <Switch colorScheme={switchColor} isChecked={task.active} onChange={() => updateTask(!task.active)} /></Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="gray.900">{lastUpdated()}</Text>
        <AddInput callBack={submitNote} placeholder={`${task.name} note`} />
      </CardBody>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        {getNoteTable()}

      </Modal>

    </Card>
  )
}

