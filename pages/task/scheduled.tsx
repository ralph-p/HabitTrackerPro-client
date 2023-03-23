import { Container } from '@chakra-ui/react'
import React from 'react'
import { BreadCrumb } from '../../component/BreadCrumb'

type Props = {}

const Scheduled = (props: Props) => {
  const navItems = [{ link: '/', name: 'Home' }, { name: 'Scheduled' }]

  return (
    <Container>
      <BreadCrumb items={navItems} />

    </Container>
  )
}

export default Scheduled