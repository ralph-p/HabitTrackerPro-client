import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CardViewControls } from '../hooks/useTask.hooks'
type Props = {
  value: CardViewControls;
  setValue: (value: CardViewControls) => void
}

export const ControlBar = ({ value, setValue }: Props) => {
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

