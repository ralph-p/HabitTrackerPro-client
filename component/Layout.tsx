import React from 'react'

import { Flex, VStack } from '@chakra-ui/react'
import Header from './Header'
import Meta from './Meta'

const Layout = ({ children }) => {
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