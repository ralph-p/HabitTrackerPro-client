import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react'
import moment from 'moment';
import { useEffect, useState } from 'react'
import { sortTaskNotesNewFirst, sortTaskNewFirst, sortTaskOldFirst, mapNoteObject, filterTasks, seconds } from '../utils/task.utils';
import { CardViewControls, FrequencyEnum, Task, TaskNote } from './types/task';

export const useTask = () => {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [taskList, setTaskList] = useState<Task[] | []>([])
  const [sortNewestFirst, setSortNewestFirst] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [value, setValue] = useState<CardViewControls>(CardViewControls.ACTIVE)


  const updateSort = () => setSortNewestFirst(!sortNewestFirst)
 
  const getTaskList = async () => {
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('task')
        .select(`id, 
          name, 
          active, 
          inserted_at, 
          name, 
          description, 
          updated_at, 
          frequency,
          duration,
          task_note(id, note, inserted_at)
        `)
        .eq('user_id', session?.user?.id)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        let newTaskList: Task[] = []
        data.map((task) => {
          if (Array.isArray(task.task_note)) {
            let resNotes: TaskNote[] | [] = task.task_note.map(
              (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at })
            )
            // map over the task note array and build an array of task notes, then sort by latest completed item
            resNotes = sortTaskNotesNewFirst(resNotes)
            const updatedString = resNotes.length ? resNotes[0].inserted_at : task.inserted_at
            const lastUpdatedDuration = moment().diff(moment(updatedString), seconds)
            const noteObject = mapNoteObject(resNotes)
            const newRes: Task = {
              id: task.id,
              name: task.name,
              active: task.active,
              inserted_at: task.inserted_at,
              notes: resNotes,
              description: task.description,
              noteObject,
              lastUpdated: lastUpdatedDuration,
              duration: task.duration,
              frequency: task.frequency,
            }
            newTaskList.push(newRes)
          }
        })
        if (sortNewestFirst) {
          newTaskList = sortTaskNewFirst(newTaskList)
        } else {
          newTaskList = sortTaskOldFirst(newTaskList)
        }
        newTaskList = filterTasks(newTaskList, value)
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

export const useTaskControl = (taskId: string) => {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [task, setTask] = useState<Task | null>(null)

  const getTask = async () => {
    try {
      const { data, error, status } = await supabase
        .from('task')
        .select(`id, 
        name, 
        active, 
        inserted_at, 
        name, 
        description, 
        updated_at, 
        duration,
        frequency,
        task_note(id, note, inserted_at, time)`)
        .eq('user_id', session?.user?.id)
        .eq('id', taskId)
        .single()
        if (error && status !== 406) {
          throw error
        }
        if (data && Array.isArray(data.task_note)) {
          let resNotes: TaskNote[] | [] = data?.task_note.map(
            (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at, time: n.time })
          )
          // map over the task note array and build an array of task notes, then sort by latest completed item
          resNotes = sortTaskNotesNewFirst(resNotes)
          const updatedString = resNotes.length ? resNotes[0].inserted_at : data.inserted_at
          const duration = moment().diff(moment(updatedString), seconds)
          const noteObject = mapNoteObject(resNotes)
          setTask({
            id: data.id,
            name: data.name,
            description: data.description,
            inserted_at: data.inserted_at, 
            noteObject,
            lastUpdated: duration,
            active: data.active,
            duration: data.duration,
            frequency: data.frequency,
            notes: resNotes,
          })
        }

    } catch (error) {
      alert('Error updating the task status!')
    }
  }
  const addTaskNote = async (taskId: string, note: string, time?: string) => {
    if (taskId && note) {
      try {
        const { error } = await supabase
          .from('task_note')
          .upsert({ note, task_id: taskId, user_id: session?.user?.id, time: time ? parseInt(time) : 0 })
          getTask();
      } catch (error) {
        alert('Error adding note data!')
      }
    } else {
      alert('Enter a task note')
    }
  }
  const updateTask = async (task: Task) => {
    try {
      const { error } = await supabase
        .from('task')
        .update({ name: task.name, description: task.description, active: task.active, duration: task.duration })
        .eq('user_id', session?.user?.id)
        .eq('id', task.id)
        getTask()
        alert(`Updated ${task.name}!`)
    } catch (error) {
      alert('Error updating the task status!')
    }
  }
  return{getTask, task, addTaskNote, updateTask}
}