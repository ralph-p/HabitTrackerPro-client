import { Container, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGSDContext } from '../../../context/context'
import { TimeInput } from '../../TimeInput'

type Props = {}

export const CreateScheduleTask = (props: Props) => {
  const { taskList } = useGSDContext()
  const [scheduledTask, setScheduledTask] = useState({taskId: '', scheduleDate: '', taskTime: 0})
  console.log(scheduledTask)
  return (
    <Container>
      <Select placeholder='Select option' onChange={(event) =>setScheduledTask({...scheduledTask, taskId: event.target.value})}>
        {taskList.map((task) => (
          <option value={task.id}>{task.name}</option>
        ))}
      </Select>
      <Input type={'date'} onChange={(event) => setScheduledTask({...scheduledTask, scheduleDate: new Date(event.target.value).toString()})} />
      <TimeInput setMinuteValue={(number) => setScheduledTask({...scheduledTask, taskTime: number})}/>
    </Container>
  )
}