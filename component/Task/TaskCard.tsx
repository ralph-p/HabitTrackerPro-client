import { Card, CardBody, CardHeader, Heading, Text, HStack, useDisclosure, IconButton, Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Task } from '../../hooks/types/task';
import moment from "moment"
import { getCardTheme, seconds, lastUpdated } from '../../utils/task.utils';
import { SettingsIcon } from '@chakra-ui/icons';
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
      </CardBody>
    </Card>
  )
}

