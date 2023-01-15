import { Card, CardBody, CardHeader, Heading, VStack, Text, Box, HStack, Switch } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Task, TaskNote } from '../hooks/useTask.hooks';
import moment from "moment"
import { AddInput } from './AddInput';
type Props = {
  task: Task;
  addNote: (taskId: string, note: string) => void;
}

export const TaskCard = ({ task, addNote }: Props) => {
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
  return (
    <Card key={`${task.name}-`} backgroundColor="gray.200" width="100%">
      <CardHeader paddingBottom={'1'}>
        <HStack justifyContent={'space-between'}>
          <Heading size="md" color="blackAlpha.900">
            {task.name}
          </Heading>
          <Text color="grey">Active: <Switch colorScheme={'teal'} isChecked={task.active} isDisabled /></Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="gray.600">{lastUpdated()}</Text>
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

