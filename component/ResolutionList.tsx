import { StackDivider, Card, CardBody, VStack, CardHeader, Heading } from '@chakra-ui/react'
import React from 'react'
import { Resolution } from '../hooks/useResolution.hooks'
import ResolutionCard from './ResolutionCard'

type Props = { resolutionList: Resolution[], addResolutionNote: (taskId: string, note: string) => Promise<void> }

export const ResolutionList = ({ resolutionList, addResolutionNote }: Props) => {
  return (
    <VStack
      align='stretch'
      divider={<StackDivider borderColor='gray.200' />}
      spacing={4}
      width="100%"
      paddingTop="4"
    >
      {
        resolutionList.map((resolution) => {
          return (<ResolutionCard key={resolution.id} resolution={resolution} addNote={addResolutionNote} />)
        })
      }
    </VStack>
  )
}