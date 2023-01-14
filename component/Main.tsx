import React, { useState } from 'react'
import { useResolution } from '../hooks/useResolution.hooks'
import { Box, Button, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { ResolutionList } from './ResolutionList'
type Props = {}

const Main = (props: Props) => {
  const [newRes, setNewRes] = useState<string>('')
  const {
    resolutionList,
    addResolution,
    addResolutionNote
  } = useResolution()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewRes(event.target.value)
  const submitNewResolution = () => {
    addResolution(newRes)
    setNewRes('')
  }
  return (
    <VStack paddingTop={4}>
      <InputGroup size='sm' width="xs" >
        <Input
          pr='4.5rem'
          type="text"
          placeholder='New Resolution'
          value={newRes}
          onChange={handleChange}
        />
        <InputRightElement width='4.5rem'>
          <AddIcon boxSize={4} onClick={submitNewResolution} cursor="pointer" />
        </InputRightElement>
      </InputGroup>
      <ResolutionList resolutionList={resolutionList} addResolutionNote={addResolutionNote} />
    </VStack >
  )
}

export default Main