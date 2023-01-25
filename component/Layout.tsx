import React from 'react'

import { Flex, VStack } from '@chakra-ui/react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <Flex alignItems="start" justifyContent="center" background="gainsboro" height="100%" overflow="hidden">
      <Flex direction="column" padding="10">
        <Header />
        {children}
      </Flex>
    </Flex>
  )
}

export default Layout