import { useSession } from '@supabase/auth-helpers-react'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { CardViewControls, FrequencyEnum, Task } from '../hooks/types/task';
import { useTask, useTaskControl } from '../hooks/useTask.hooks';

const voidFunction = async () => {

}
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
  getTask: (taskId: string) => Promise<void>;
  task: Task | null;
  addTaskNote: (taskId: string, note: string, time?: string | undefined) => Promise<void>; 
  updateTask: (task: Task) => Promise<void>; 
  addSubtask: (taskId: string, name: string, description?: string | undefined) => Promise<void>;

}
export const GSDContext = createContext<GSDContextProps>({
  session: null,
  user: {},
  loading: true,
  setUser: voidFunction,
  setLoading: voidFunction,
  addTask: voidFunction,
  updateSort: voidFunction,
  controlValue: CardViewControls.ACTIVE,
  newestFist: true,
  taskList: [],
  setControlValue: voidFunction,
  getTaskList: voidFunction,
  getTask: voidFunction,
  task: null, 
  updateTask: voidFunction, 
  addTaskNote: voidFunction, 
  addSubtask: voidFunction, 
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
  const { getTask, task, addTaskNote, updateTask, addSubtask } = useTaskControl()

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
      getTask,
      task,
      addTaskNote,
      updateTask,
      addSubtask
    }}>{children}</GSDContext.Provider>
  )
}

export const useGSDContext = () => useContext(GSDContext);
