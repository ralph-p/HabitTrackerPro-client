import { useSupabaseClient, useUser, useSession } from '@supabase/auth-helpers-react'
import moment from 'moment';
import { useEffect, useState } from 'react'
import { sortTaskNotesNewFirst, sortTaskNewFirst, sortTaskOldFirst, mapNoteObject, filterTasks, seconds, getPercentDone, sortSubtaskNewFirst } from '../utils/task.utils';
import { CardViewControls, FrequencyEnum, Subtask, Task, TaskNote } from './types/task';

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
          task_note(id, note, inserted_at, time)
        `)
        .eq('user_id', session?.user?.id)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        let newTaskList: Task[] = []
        data.map((task) => {
          if (Array.isArray(task.task_note)) {
            let taskNotes: TaskNote[] | [] = task.task_note.map(
              (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at, time: n.time })
            )
            // map over the task note array and build an array of task notes, then sort by latest completed item
            taskNotes = sortTaskNotesNewFirst(taskNotes)
            const updatedString = taskNotes.length ? taskNotes[0].inserted_at : task.inserted_at
            const lastUpdatedDuration = moment().diff(moment(updatedString), seconds)
            const percentComplete = getPercentDone(taskNotes, task.duration, task.frequency)
            const newRes: Task = {
              id: task.id,
              name: task.name,
              active: task.active,
              inserted_at: task.inserted_at,
              notes: taskNotes,
              description: task.description,
              lastUpdated: lastUpdatedDuration,
              duration: task.duration,
              frequency: task.frequency,
              percentComplete,
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

export const useTaskControl = () => {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [task, setTask] = useState<Task | null>(null)

  const getTask = async (taskId: string) => {
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
        task_note(id, note, inserted_at, time),
        subtask(id, name, description, complete, inserted_at)
        `)
        .eq('user_id', session?.user?.id)
        .eq('id', taskId)
        .single()
        if (error && status !== 406) {
          throw error
        }
        if (data && Array.isArray(data.task_note) && Array.isArray(data.subtask)) {
          let taskNotes: TaskNote[] | [] = data?.task_note.map(
            (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at, time: n.time })
          )
          let subtasks: Subtask[] | [] = data?.subtask.map(
            (n) => ({ id: n.id, name: n.name, inserted_at: n.inserted_at, description: n.description, complete: n.complete })
          )
          // map over the task note array and build an array of task notes, then sort by latest completed item
          taskNotes = sortTaskNotesNewFirst(taskNotes)
          subtasks = sortSubtaskNewFirst(subtasks)
          const updatedString = taskNotes.length ? taskNotes[0].inserted_at : data.inserted_at
          const duration = moment().diff(moment(updatedString), seconds)
          const noteObject = mapNoteObject(taskNotes)
          const percentComplete = getPercentDone(taskNotes, data.duration, data.frequency)
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
            notes: taskNotes,
            percentComplete,
            subtasks,
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
          .upsert({ name, description,  task_id: taskId, user_id: session?.user?.id, complete: false })
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
  return{getTask, task, addTaskNote, updateTask, addSubtask, updateSubtask}
}