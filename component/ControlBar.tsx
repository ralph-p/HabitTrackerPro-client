import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useGSDContext } from '../context/context';
import { CardViewControls } from '../hooks/useTask.hooks'

export const ControlBar = () => {
  const { controlValue: value, setControlValue: setValue } = useGSDContext()

  // const [value, setValue] = useState<CardViewControls>(CardViewControls.ACTIVE)
  return (
    <RadioGroup onChange={(value: CardViewControls) => setValue(value)} value={value}>
      <Stack direction='row'>
        <Radio value={CardViewControls.ACTIVE}>Active</Radio>
        <Radio value={CardViewControls.ARCHIVED}>Archived</Radio>
        <Radio value={CardViewControls.ALL}>All</Radio>
      </Stack>
    </RadioGroup>
  )
}

