import React from 'react'
import { useResolution } from '../hooks/useResolution.hooks'
import { VStack } from '@chakra-ui/react'
import { TaskList } from './TaskList'
import { AddInput } from './AddInput'

type Props = {}

const Main = (props: Props) => {
  const {
    taskList,
    addResolution,
    addResolutionNote
  } = useResolution()
  const submitNewResolution = (task: string) => addResolution(task)
  return (
    <VStack paddingTop={4}>
      <AddInput callBack={submitNewResolution} placeholder="Add Task" />
      <TaskList taskList={taskList} addResolutionNote={addResolutionNote} />
    </VStack >
  )
}

export default Main