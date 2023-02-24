import { Input } from '@chakra-ui/react';
import React, { useEffect, useState, FocusEvent } from 'react'
import { getMinutesFromHHMM, toHHMMString } from '../utils/time.utils';

type Props = {
  setMinuteValue: (minute: number) => void
  initalValue?: number;
}

export const TimeInput = ({setMinuteValue, initalValue}: Props) => {
  const [value, setValue] = useState<string | undefined>(toHHMMString(initalValue));  
  useEffect(() => {
    const minutes = getMinutesFromHHMM(value)
    if (minutes) setMinuteValue(minutes)
  }, [value])
  
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const seconds = Math.max(0, getMinutesFromHHMM(value));
    const time = toHHMMString(seconds);
    setValue(time);
  };

  return (
    <Input
      type="text"
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      size='sm'
      placeholder='HH:MM'
    />
  );
}