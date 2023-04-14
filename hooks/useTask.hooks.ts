import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react'
import moment from 'moment';
import { cache, useEffect, useState } from 'react'
import { } from '../api/api-client';
import { AUTH_TOKEN_KEY } from '../context/context';
import { sortTaskNotesNewFirst, sortTaskNewFirst, sortTaskOldFirst, mapNoteObject, filterTasks, seconds, getPercentDone, sortSubtaskNewFirst } from '../utils/task.utils';
import { CardViewControls, FrequencyEnum, Subtask, Task, TaskDTO, TaskNote } from './types/task';

export const useTask = () => {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [taskList, setTaskList] = useState<Task[] | []>([])
  const [sortNewestFirst, setSortNewestFirst] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<CardViewControls>(CardViewControls.ACTIVE)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    setToken(token)
  }, [])

  const updateSort = () => setSortNewestFirst(!sortNewestFirst)

  const getTaskList = async () => {
    try {
      setLoading(true)
      let url = `http://127.0.0.1:5000/tasks`;
      let options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`
        },
      };
      let response = await fetch(url, options);
      let responseOK = response && response.ok;
      if (responseOK) {
        const { tasks }: { tasks: TaskDTO[] } = await response.json();
        let newTaskList: Task[] = []
        tasks.map((task) => {
          const lastUpdatedDuration = moment().diff(moment(task.updated_at), seconds)

          const newTask: Task = {
            id: task.id,
            name: task.name,
            active: task.active,
            inserted_at: task.inserted_at,
            description: task.description,
            lastUpdated: lastUpdatedDuration,
            duration: task.duration,
            frequency: task.frequency,
            amountDone: task.amount_done,
          }
          newTaskList.push(newTask)
        })
        setTaskList([...newTaskList]);
      }
    } catch (error) {
      alert('Error loading activity data!')
    }
    setLoading(false)
  }

  const addTask = async (name: string, description?: string, duration?: number, frequency?: FrequencyEnum) => {
    if (name) {
      try {
        const { error } = await supabase
          .from('task')
          .upsert({ name, active: true, user_id: session?.user?.id, description, duration, frequency })
        getTaskList()
      } catch (error) {
        alert('Error creating data!')
      }
    } else {
      alert('Gotta enter a name to create a task!')
    }
  }
  const setControlValue = (value: CardViewControls) => {
    setValue(value)
  }
  return {
    taskList,
    addTask,
    updateSort,
    newestFist: sortNewestFirst,
    loading,
    controlValue: value,
    setControlValue,
    getTaskList,
  }
}

export const useTaskControl = () => {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [task, setTask] = useState<Task | null>(null)
  const [token, setToken] = useState<string | null>(null)
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    setToken(token)
  }, [])

  const getTask = async (taskId: string) => {
    try {
      let url = `http://127.0.0.1:5000/task?task_id=${taskId}`;
      let options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${token}`
        }
      };
      let response = await fetch(url, options);
      let responseOK = response && response.ok;
      if (responseOK) {
        const { task }: { task: TaskDTO } = await response.json();
        const lastUpdated = moment().diff(moment(task?.updated_at), seconds)
        const noteObject = mapNoteObject(task.task_note)
        setTask({
          id: task.id,
          name: task.name,
          description: task.description,
          inserted_at: task.inserted_at,
          noteObject,
          lastUpdated,
          active: task.active,
          duration: task.duration,
          frequency: task.frequency,
          notes: task.task_note,
          amountDone: task.amount_done,
          subtasks: task.subtask,
        })

      }

    } catch (error) {
      console.log(error);
      alert('Error getting the task!')

    }
  }
  const addTaskNote = async (taskId: string, note: string, time?: string) => {
    if (taskId && note) {
      try {
        const { error } = await supabase
          .from('task_note')
          .upsert({ note, task_id: taskId, user_id: session?.user?.id, time: time ? parseInt(time) : 0 })
        getTask(taskId);
      } catch (error) {
        alert('Error adding note data!')
      }
    } else {
      alert('Enter a task note')
    }
  }
  const addSubtask = async (taskId: string, name: string, description?: string) => {
    if (taskId && name) {
      try {
        const { error } = await supabase
          .from('subtask')
          .upsert({ name, description, task_id: taskId, user_id: session?.user?.id, complete: false })
        getTask(taskId);
      } catch (error) {
        alert('Error adding note data!')
      }
    } else {
      alert('Enter a task note')
    }
  }
  const updateSubtask = async (taskId: string, subtaskId: string, complete: boolean) => {
    try {
      const { error } = await supabase
        .from('subtask')
        .update({ complete })
        .eq('user_id', session?.user?.id)
        .eq('id', subtaskId)
      getTask(taskId)
    } catch (error) {
      alert('Error adding note data!')
    }
  }
  const updateTask = async (task: Task) => {
    try {
      const { error } = await supabase
        .from('task')
        .update({ name: task.name, description: task.description, active: task.active, duration: task.duration, frequency: task.frequency })
        .eq('user_id', session?.user?.id)
        .eq('id', task.id)
      getTask(task.id)
      alert(`Updated ${task.name}!`)
    } catch (error) {
      alert('Error updating the task status!')
    }
  }
  return { getTask, task, addTaskNote, updateTask, addSubtask, updateSubtask }
}