import { Container, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BreadCrumb } from '../../component/BreadCrumb'
import { CreateScheduleTask } from '../../component/Task/Schedule/CreateScheduleTask'
import { ScheduleTaskList } from '../../component/Task/Schedule/ScheduleTaskList'
import { useGSDContext } from '../../context/context'

type Props = {}

const Scheduled = (props: Props) => {
  const navItems = [{ link: '/', name: 'Home' }, { name: 'Scheduled' }]
  const { taskList, getTaskList, user } = useGSDContext()

  useEffect(() => {
    if (user && user?.id) {
      getTaskList()
    }
  }, [user])
  if (!user) return <Skeleton />
  return (
    <Container>
      <BreadCrumb items={navItems} />
      <CreateScheduleTask />
      <ScheduleTaskList />
    </Container>
  )
}

export default Scheduled