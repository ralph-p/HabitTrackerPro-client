import { AddIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  callBack: (input: string, time?: string,) => void;
  placeholder?: string;
  characterLimit?: number;
}
export const AddInput = ({ callBack, placeholder }: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [numberValue, setNumberValue] = useState<string | number>(0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value
    setInputValue(event.target.value)
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value
    setNumberValue(event.target.value)
  }
  const submitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addButtonOnClick()
    }
    
  }
  const addButtonOnClick = () => {
    setInputValue('');
    setNumberValue(0);
    callBack(inputValue, numberValue as string)
  }
  return (
    <InputGroup size='sm' width="xs" >

      <Input
        pr='4.5rem'
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        color={'blackAlpha.900'}
        backgroundColor="whiteAlpha.700"
      />
      {/* <Input
        onChange={handleTimeChange}
        value={numberValue}
        type='number'
        onKeyDown={submitOnEnter}
      /> */}
      <NumberInput>
        <NumberInputField
          placeholder='min'
          color={'blackAlpha.900'}
          backgroundColor="whiteAlpha.600"
          onKeyDown={submitOnEnter}
          onChange={handleTimeChange}
          value={numberValue}
          min={0}
          defaultValue={0}
          id='duration'
        />
      </NumberInput>
      <InputRightElement width='3.5rem'>
        <AddIcon boxSize={4} onClick={addButtonOnClick} cursor="pointer" color={'teal'} />
      </InputRightElement>
    </InputGroup>)
}

