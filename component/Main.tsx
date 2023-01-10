import React, { useState } from 'react'
import Account from './Account'
import { useSession } from '@supabase/auth-helpers-react'
type Props = {}

const Main = (props: Props) => {
    const session = useSession()
    const [showAccount, setShowAccount] = useState<boolean>(false)
  return (
      <>
        Main Page
        <button
          className="button primary block"
          onClick={() => setShowAccount(!showAccount)}
        >
          {showAccount ? 'Hide Account' : 'Account info'}
        </button>
        {showAccount && <Account session={session}/>}
      </>
  )
}

export default Main