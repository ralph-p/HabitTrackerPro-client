import { useSession } from '@supabase/auth-helpers-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CardViewControls, Task, useTask } from '../hooks/useTask.hooks';


interface GSDContextProps {
  session: any;
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  addTask: (name: string, description?: string | undefined) => void;
  taskList: Task[] | [],
  newestFist: boolean,
  updateSort: () => void,
  addTaskNote: (taskId: string, note: string) => void;
  updateTask: (task: Task) => void;
  controlValue: CardViewControls;
  setControlValue: (value: CardViewControls) => void;
}
export const GSDContext = createContext<GSDContextProps>({
  session: null,
  user: {},
  loading: true,
  setUser: () => { },
  setLoading: () => { },
  addTask: () => { },
  updateSort: () => { },
  addTaskNote: () => { },
  updateTask: () => { },
  controlValue: CardViewControls.ACTIVE,
  newestFist: true,
  taskList: [],
  setControlValue: () => { },
})



export const Context = ({ children }) => {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const {
    taskList,
    addTask,
    addTaskNote,
    updateSort,
    newestFist,
    controlValue,
    setControlValue,
    updateTask,
  } = useTask()

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
      addTask,
      taskList,
      updateSort,
      newestFist,
      addTaskNote,
      updateTask,
      controlValue,
      setControlValue,
    }}>{children}</GSDContext.Provider>
  )
}

export const useGSDContext = () => useContext(GSDContext);
