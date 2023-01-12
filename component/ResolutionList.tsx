import { Accordion, AccordionItem, Box, AccordionIcon, AccordionButton, AccordionPanel } from '@chakra-ui/react'
import React from 'react'

type Props = { resolutionList: any[] }

export const ResolutionList = ({ resolutionList }: Props) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {
        resolutionList.map((resolution) => (
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex='2' textAlign='left'>
                {resolution.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        ))
      }
      {/* <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </AccordionPanel>
      </AccordionItem> */}
    </Accordion>
  )
}