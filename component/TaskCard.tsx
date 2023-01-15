import { Card, CardBody, CardHeader, Heading, VStack, Text, Box, HStack, Switch } from '@chakra-ui/react'
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
        <VStack>
          {
            task.notes?.map((note: TaskNote) => (
              <HStack key={note.id} width="100%" justifyContent="space-between">
                <Text size="sm" color="blackAlpha.900">{note.note}</Text>
                <Text size="sm" color="blackAlpha.500">{moment(note.inserted_at).format('DD/MMM/yy')}</Text>
              </HStack>
            ))
          }
        </VStack>
      </CardBody>


    </Card>
  )
}

