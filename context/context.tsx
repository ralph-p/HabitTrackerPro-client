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
  updateSubtask: (taskId: string, subtaskId: string ,complete: boolean) => Promise<void>;

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
  updateSubtask: voidFunction,
})

interface Props {
  children?: ReactNode
}

export const AUTH_TOKEN_KEY = 'authToken';

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
  const { getTask, task, addTaskNote, updateTask, addSubtask, updateSubtask } = useTaskControl()
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if(!token && session) {
      // localStorage.setItem(AUTH_TOKEN_KEY, session.access_token)
      localStorage.setItem(AUTH_TOKEN_KEY, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjgwMDE4ODAwLCJzdWIiOiJlODNlZGU2OC1hYjE2LTRkODctODhhZi1hNmM1MmMxZDM1MmQiLCJlbWFpbCI6Im1ycGVyZWlyYTkxQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNjgwMDE1MjAwfV0sInNlc3Npb25faWQiOiIyNTgwNzk5MC1iOTNlLTQzYzAtYjQzZC05ODI5ZjhlNDZlNWIifQ.42gfU_LK9GZPoAbEgO77sTh_Cxbk4_IOX0eSfBivVp4')
    }

  }, [])
  
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
      addSubtask,
      updateSubtask
    }}>{children}</GSDContext.Provider>
  )
}

export const useGSDContext = () => useContext(GSDContext);
