import React, { useState } from 'react'
import Account from './Account'
import { useSession } from '@supabase/auth-helpers-react'
import { useResolution } from '../hooks/useResolution.hooks'
type Props = {}

const Main = (props: Props) => {
  const session = useSession()
  const [showAccount, setShowAccount] = useState<boolean>(false)
  const { resolutionList, addResolution, getResolutionNotes, addResolutionNote } = useResolution()

  return (
    <>
      Main Page
      <button
        className="button primary block"
        onClick={() => setShowAccount(!showAccount)}
      >
        {showAccount ? 'Hide Account' : 'Account info'}
      </button>
      <button
        className="button primary block"
        onClick={() => addResolution("Read More")}
      >
        Add Resolution
      </button>
      {showAccount && <Account session={session} />}
      {resolutionList && (
        resolutionList.map((r) => (
          <div onClick={() => getResolutionNotes(r.id)}>
            {r.name}
            <button
              className="button primary block"
              onClick={() => addResolutionNote(r.id, "Read Today")}
            >
              Add Note
            </button>
          </div>
        ))
      )}
    </>
  )
}

export default Main