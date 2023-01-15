import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
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
  Input
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account({ session }: { session: Session | null }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SettingsIcon boxSize={4} onClick={onOpen} cursor="pointer" />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent backgroundColor="blackAlpha.900">
          <ModalHeader>Account Details</ModalHeader>
          <ModalBody>
            <Text size="md">Add something you want to do more of, and update it whenever you complete the task.</Text>
            <Stack spacing={3}>
              <Text mb='8px'>Email: {session.user.email}</Text>
              <Input
                placeholder='Username'
                size='sm'
                variant='outline'
              />
              <Input
                placeholder='Website'
                size='sm'
                variant='outline'
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
  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
