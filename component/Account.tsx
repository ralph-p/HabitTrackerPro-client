import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Stack,
  Input,
  Icon,
  Code
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

export default function Account({ session }: { session: Session | null }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SettingsIcon boxSize={4} onClick={onOpen} cursor="pointer" />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="blackAlpha.900">
          <ModalHeader>Account Details</ModalHeader>
          <ModalBody>
            <Text size="md">
              Add something you want to do more of, and update it whenever you complete the task. <br />
              If you have updated a task in the last 24 hours your card <Code colorScheme='green' children="will be green" /> if you have a task that hasn't been updated in over 24 <Code colorScheme='yellow'children="will be yellow" /> if it's been more than 3 days <Code colorScheme='red'children="will be red" />
            
            </Text>
            <Stack spacing={3}>
              <Text mb='8px'>Email: {session?.user.email}</Text>
              <Input
                placeholder='Username'
                size='sm'
                variant='outline'
                isDisabled
              />
              <Input
                placeholder='Website'
                size='sm'
                variant='outline'
                isDisabled
              />
              <Button onClick={() => supabase.auth.signOut()}>Sign Out</Button>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Save & Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
