import { Card, CardBody, CardHeader, Heading, Text, HStack, useDisclosure, IconButton, Box } from '@chakra-ui/react'
import React from 'react'
import { FrequencyString, Task } from '../../hooks/types/task';
import { getCardTheme, lastUpdated } from '../../utils/task.utils';
import { toHHMMDisplay } from '../../utils/time.utils';
type Props = {
  task: Task;
}

export const TaskCard = ({ task }: Props) => {

  const { cardColor } = getCardTheme(task.lastUpdated)


  return (
    <Card key={`${task.name}-`} backgroundColor={cardColor} width="100%" as={'a'} href={`/task/${task.id}`}>
      <CardHeader paddingBottom={'1'}>
        <HStack justifyContent={'space-between'}>
          <Heading size="md" color="blackAlpha.800">
            {task.name}
          </Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Text color="gray.900">{lastUpdated(task.lastUpdated)}</Text>
        <Text color="gray.900">{`${toHHMMDisplay(task.duration)} every ${FrequencyString[task.frequency]}`}</Text>
        <Text color="gray.900">{`${(task.percentComplete).toFixed(1)}% complete`}</Text>
      </CardBody>
    </Card>
  )
}

