import { useSession } from '@supabase/auth-helpers-react'
import React, { createContext, useContext, useEffect, useState } from 'react'


interface GSDContextProps {
  session: any;
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
}
export const GSDContext = createContext<GSDContextProps>({
  session: null,
  user: {},
  loading: true,
  setUser: () => { },
  setLoading: () => { },
})



export const Context = ({ children }) => {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    if (session) {
      setCurrentUser(session.user)
    } else {
      setCurrentUser({})
    }
  }, [session])

  return (
    <GSDContext.Provider value={{
      session,
      user: currentUser,
      loading: isLoading,
      setUser: setCurrentUser,
      setLoading: setIsLoading,
    }}>{children}</GSDContext.Provider>
  )
}

export const useGSDContext = () => useContext(GSDContext);
