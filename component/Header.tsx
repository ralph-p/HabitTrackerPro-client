import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import React from 'react'

type Props = {}

const Header = (props: Props) => {    
  return (
    <VStack spacing={2}>
    <HStack>
      <Heading as='h1' size="xl" color="blackAlpha.700">GSD tracker</Heading>
    </HStack>
    <Box width="70%">
      <Heading as='h3' size='sm'  color="blackAlpha.600">A simple web app to help you Get Stuff Done.</Heading>
    </Box>
  </VStack>
  )
}

export default Header