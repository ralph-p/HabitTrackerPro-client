import { useSession } from '@supabase/auth-helpers-react'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { CardViewControls, FrequencyEnum, Task } from '../hooks/types/task';
import { useTask } from '../hooks/useTask.hooks';
import { ToDo, useToDo } from '../hooks/useToDo.hooks';


interface GSDContextProps {
  session: any;
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
  setLoading: (loading: boolean) => void;
  addTask: (name: string, description?: string, duration?: number, frequency?: FrequencyEnum) => void;
  taskList: Task[] | [],
  newestFist: boolean,
  updateSort: () => void,
  controlValue: CardViewControls;
  setControlValue: (value: CardViewControls) => void;
  getTaskList: () => void;
  addToDo: (name: string, description?: string | undefined, dueDate?: string | undefined) => void,
  getToDoList: () => void;
  toDoList: ToDo[];

}
export const GSDContext = createContext<GSDContextProps>({
  session: null,
  user: {},
  loading: true,
  setUser: () => { },
  setLoading: () => { },
  addTask: () => { },
  updateSort: () => { },
  controlValue: CardViewControls.ACTIVE,
  newestFist: true,
  taskList: [],
  setControlValue: () => { },
  getTaskList: () => { },
  addToDo: () => { },
  getToDoList: () => { },
  toDoList: [],

})

interface Props {
  children?: ReactNode
}

export const Context = ({ children }: Props) => {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const {
    taskList,
    addTask,
    updateSort,
    newestFist,
    controlValue,
    setControlValue,
    getTaskList,
  } = useTask()
  const {addToDo, getToDoList, toDoList} = useToDo()
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
      controlValue,
      setControlValue,
      getTaskList,
      addToDo,
      getToDoList,
      toDoList,
    }}>{children}</GSDContext.Provider>
  )
}

export const useGSDContext = () => useContext(GSDContext);
