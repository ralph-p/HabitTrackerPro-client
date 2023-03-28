import { TimeIcon } from '@chakra-ui/icons';
import { Card, CardBody, CardHeader, Heading, Text, HStack, useDisclosure, IconButton, Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
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
          <Text color="gray.900">{`${toHHMMDisplay(task.duration)} every ${FrequencyString[task.frequency]}`}</Text>

        </HStack>
      </CardHeader>
      <CardBody>
        <HStack spacing={2} justifyContent='space-between'>
          <Text color="gray.900"><TimeIcon />{lastUpdated(task.lastUpdated)}</Text>
          <CircularProgress value={task.amountDone} color='green.400'>
            <CircularProgressLabel><Text color="gray.900">{`${(task.duration/task.amountDone).toFixed(1)}%`}</Text></CircularProgressLabel>
          </CircularProgress>
        </HStack>
        {/* <Text color="gray.900">{`${(task.amountDone).toFixed(1)}% complete`}</Text> */}
      </CardBody>
    </Card>
  )
}

