import React from 'react'
import { useTask } from '../hooks/useTask.hooks'
import { Button, VStack, Skeleton, HStack } from '@chakra-ui/react'
import { TaskList } from './TaskList'
import { AddInput } from './AddInput'
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import { ControlBar } from './ControlBar'

type Props = {}

const Main = (props: Props) => {
  const {
    taskList,
    addTask,
    addTaskNote,
    updateSort,
    setActive,
    newestFist,
    loading,
    controlValue,
    setControlValue,
  } = useTask()
  const submitNewTask = (task: string) => addTask(task)
  return (
    <VStack paddingTop={4}>
      <HStack>
        <AddInput callBack={submitNewTask} placeholder="Add Task" />
        <Button size="sm" onClick={updateSort} colorScheme='teal'>{newestFist ? <ArrowDownIcon /> : <ArrowUpIcon />}</Button>
      </HStack>
      <ControlBar value={controlValue} setValue={setControlValue} />
      {!loading ? <TaskList taskList={taskList} addTaskNote={addTaskNote} setActive={setActive} /> : <Skeleton height='100vh' />}
    </VStack >
  )
}

export default Main