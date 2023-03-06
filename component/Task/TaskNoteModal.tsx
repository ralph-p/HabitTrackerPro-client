import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useGSDContext } from '../../context/context';
import { TimeInput } from '../TimeInput';


type Props = {
  isOpen: boolean;
  onClose: () => void
  noteString: string;

}

const TaskNoteModal = ({ isOpen, onClose, noteString }: Props) => {
  const [modalNote, setModalNote] = useState({ note: '', time: 0 })
  const { task, addTaskNote } = useGSDContext()
  const submitNote = () => {
    if (task) {
      addTaskNote(task?.id, modalNote.note, `${modalNote.time}`)
      setModalNote({ note: '', time: 0 })
      onClose()
    }
  }
  useEffect(() => {
    setModalNote({...modalNote, note: noteString})
  
    return () => {
      setModalNote({note: '', time: 0})

    }
  }, [])
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const note = event?.target?.value
    setModalNote({ ...modalNote, note })
  }
  const setNumberValue = (time: number) => {
    setModalNote({ ...modalNote, time })
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered >
      <ModalOverlay />
      <ModalContent margin="1em">
        <ModalHeader>
          {task?.name}
        </ModalHeader>
        <ModalBody>
          <VStack spacing={3}>

            <Input
              pr='4.5rem'
              type="text"
              placeholder={noteString}
              value={modalNote.note}
              onChange={handleInputChange}
              color={'blackAlpha.900'}
              backgroundColor="whiteAlpha.700"
            />
            <TimeInput setMinuteValue={setNumberValue} />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={submitNote} colorScheme='whatsapp'>Save</Button>

        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}

export default TaskNoteModal