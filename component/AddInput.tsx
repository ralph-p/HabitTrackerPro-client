import { AddIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {
  callBack: (input: string) => void;
  placeholder?: string;
  characterLimit?: number;
}
const CHARACTER_LIMIT = 30;
export const AddInput = ({ callBack, placeholder, characterLimit = CHARACTER_LIMIT }: Props) => {
  const [inputValue, setInputValue] = useState<string>('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value
    if (value.length <= characterLimit) setInputValue(event.target.value)
  }
  const addButtonOnClick = () => {
    callBack(inputValue)
    setInputValue('')
  }
  return (
    <InputGroup size='sm' width="xs" >
      <Input
        pr='4.5rem'
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        color="blackAlpha.800"
      />
      <InputRightElement width='4.5rem'>
        <IconButton
          aria-label="add-button"
          icon={<AddIcon />}
          onClick={addButtonOnClick}
          size="sm"
          variant={'unstyled'}
        />
        {/* <AddIcon boxSize={4}  cursor="pointer" color="blackAlpha.600" /> */}
      </InputRightElement>
    </InputGroup>)
}

