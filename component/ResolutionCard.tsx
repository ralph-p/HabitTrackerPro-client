import { AddIcon } from '@chakra-ui/icons';
import { Card, CardBody, CardHeader, Heading, Input, InputGroup, InputRightElement, VStack, Text, Box, HStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Resolution } from '../hooks/useResolution.hooks';
import moment from "moment"
type Props = {
  resolution: Resolution;
  addNote: (taskId: string, note: string) => void;
}

const ResolutionCard = ({ resolution, addNote }: Props) => {
  const [note, setNote] = useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setNote(event.target.value)
  const submitNote = () => {
    addNote(resolution.id, note)
    setNote('')
  }
  const lastUpdated = () => {
    const duration = moment.duration(resolution.lastUpdated, 'minutes')
    if (duration.days() > 0) {
      return `Updated: ${duration.days()}d ${duration.hours()}h ago`
    }
    if (duration.hours() > 0) {
      return `Updated: ${duration.hours()}h ${duration.minutes()}m ago`
    }
    return `Updated: ${duration.minutes()}m ago`
  }
  return (
    <Card key={`${resolution.name}-`} backgroundColor="gray.200" width="100%">
      <CardHeader>
        <>
          <Heading size="md" color="blackAlpha.900">
            {resolution.name}
          </Heading>
          {lastUpdated()}
        </>
      </CardHeader>
      <CardBody>
        <InputGroup size='sm' width="xs" >
          <Input
            pr='4.5rem'
            type="text"
            placeholder={`${resolution.name} note`}
            value={note}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <AddIcon boxSize={4} onClick={submitNote} cursor="pointer" />
          </InputRightElement>
        </InputGroup>
        <VStack>
          {
            resolution.notes?.map((note) => (
              <HStack key={note.id}>
                <Text size="sm" color="blackAlpha.500">{note.note}</Text>
                <Text size="sm" color="blackAlpha.500">{moment(note.inserted_at).format('d/MMM/yy')}</Text>
              </HStack>
            ))
          }
        </VStack>
      </CardBody>


    </Card>
  )
}

export default ResolutionCard