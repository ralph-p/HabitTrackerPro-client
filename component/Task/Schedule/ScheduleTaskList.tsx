import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {}

export const ScheduleTaskList = (props: Props) => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }
  return (
    <Container>
      <Tabs index={tabIndex} onChange={handleTabsChange} isLazy isFitted>
        <TabList>
          <Tab>Upcoming</Tab>
          <Tab>Missed</Tab>
          <Tab>Complete</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Click the tabs or pull the slider around</p>
          </TabPanel>
          <TabPanel>
            <p>Yeah yeah. What's up?</p>
          </TabPanel>
          <TabPanel>
            <p>Oh, hello there.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}