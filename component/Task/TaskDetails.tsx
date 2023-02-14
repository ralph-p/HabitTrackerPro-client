import { VStack, Text, HStack, Switch, Textarea, Input } from '@chakra-ui/react';
import React from 'react'
import { Task, Frequency } from '../../hooks/types/task'
import { lastUpdated } from '../../utils/task.utils'

type TaskDetailsProps = {
  task: Task;
  readOnly: boolean;
  updateTask: (value: string | boolean, key: string) => void;
}

export const TaskDetails = ({ task, readOnly, updateTask }: TaskDetailsProps) => {
  const getReadOnly = () => (
    <>
      <Text>Name: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Duration: {task.duration}</Text>
      <Text>Frequency: {Frequency[task.frequency]}</Text>
      <Text>{lastUpdated(task.lastUpdated)}</Text>
      <HStack>
        <Text color={'blackAlpha.500'} fontWeight='bold'>Active</Text>
        <Switch isChecked={task?.active} disabled />
      </HStack>
    </>
  )
  const getEdit = () => {
    return (
      <>
        <Input
          value={task?.name}
          onChange={(event) => updateTask(event?.target?.value, 'name')}
          color="blackAlpha.700"
          borderColor={'facebook.900'}
        />
        <Textarea
          value={task?.description}
          onChange={(event) => updateTask(event?.target?.value, 'description')}
          placeholder='Enter some details about this task...'
          color="blackAlpha.700"
          borderColor={'facebook.900'}
          size='sm'
        />
         <Input
          value={task?.duration}
          onChange={(event) => updateTask(event?.target?.value, 'name')}
          color="blackAlpha.700"
          borderColor={'facebook.900'}
          type='number'
        />
        <HStack>
          <Text color={'blackAlpha.500'} fontWeight='bold'>Active</Text>
          <Switch isChecked={task?.active} onChange={() => updateTask(!task?.active, 'active')} />

        </HStack>
      </>
    )
  }
  return (
    <VStack width={"100%"} spacing={3}>
      {
        readOnly ? getReadOnly() : getEdit()
      }
    </VStack>
  )
}