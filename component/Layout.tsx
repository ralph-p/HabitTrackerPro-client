import React, { ReactNode } from 'react'

import { Flex, VStack } from '@chakra-ui/react'
import Header from './Header'
import Meta from './Meta'

interface Props {
  children?: ReactNode
}
const Layout = ({ children }: Props) => {
  return (
    <>
    <Meta />
    <Flex alignItems="start" justifyContent="center" background="gainsboro" height="100%" overflow="hidden">
      <Flex direction="column" padding="10">
        <Header />
        {children}
      </Flex>
    </Flex>
    </>
  )
}

export default Layout