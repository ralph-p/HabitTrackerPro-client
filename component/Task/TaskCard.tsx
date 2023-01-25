import { Card, CardBody, CardHeader, Heading, Text, HStack, useDisclosure, IconButton, Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Task } from '../../hooks/useTask.hooks';
import moment from "moment"
import { AddInput } from '../AddInput';
import { getCardTheme, seconds } from '../../utils/task.utils';
import { SettingsIcon } from '@chakra-ui/icons';
import { TaskModal } from '../TaskModal';
import { useGSDContext } from '../../context/context';
type Props = {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {
  const { addTaskNote, updateTask } = useGSDContext()

  const submitNote = (note: string) => addTaskNote(task.id, note)
  const lastUpdated = () => {
    const duration = moment.duration(task.lastUpdated, seconds)
    if (duration.days() > 0) {
      return `Updated: ${duration.days()}d ${duration.hours()}h ago`
    }
    if (duration.hours() > 0) {
      return `Updated: ${duration.hours()}h ${duration.minutes()}m ago`
    }
    return `Updated: ${duration.minutes()}m ago`
  }
  const { cardColor } = getCardTheme(task.lastUpdated)


  return (
    <Card key={`${task.name}-`} backgroundColor={cardColor} width="100%">
      <CardHeader paddingBottom={'1'}>
        <HStack justifyContent={'space-between'}>
          <Heading size="md" color="blackAlpha.800">
            {task.name}
          </Heading>
          <Text color="blackAlpha.700">
            <IconButton
              aria-label={'open-task-modal'}
              size='sm'
              icon={<SettingsIcon />}
              variant='ghost'
              colorScheme='teal'
              border='0px'
              // onClick={onOpen}
              as="a"
              href={`/task/${task.id}`}
            />
          </Text>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="gray.900">{lastUpdated()}</Text>
        <Box width={'100%'}><AddInput callBack={submitNote} placeholder={`${task.name} note`} /></Box>
      </CardBody>
    </Card>
  )
}

