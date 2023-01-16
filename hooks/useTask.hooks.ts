import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import moment from 'moment';
import { useEffect, useState } from 'react'
import { sortTaskNotesNewFirst, sortTaskNotesOldFirst, sortTaskNewFirst, sortTaskOldFirst, mapNoteObject } from '../utils/task.utils';
export type Task = {
  id: string;
  name: string;
  active: boolean;
  inserted_at: string;
  lastUpdated: number;
  notes?: TaskNote[];
  noteObject?: NoteObject;
}
export type NoteObject = {
  [date: string]: string[];
}
export type TaskNote = {
  id: string;
  note: string;
  inserted_at: string;
}
export const useTask = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [taskList, setTaskList] = useState<Task[] | []>([])
  const [sortNewestFirst, setSortNewestFirst] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    if (user) {
      getTaskList()
    }
  }, [user, sortNewestFirst])
  const updateSort = () => setSortNewestFirst(!sortNewestFirst)

  const getTaskList = async () => {
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('task')
        .select(`id, name, active, inserted_at, name, updated_at, task_note(id, note, inserted_at)`)
        .eq('user_id', user?.id)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        let newResolutionList: Task[] = []
        data.map((resolution) => {
          if (Array.isArray(resolution.task_note)) {
            let resNotes: TaskNote[] | [] = resolution.task_note.map(
              (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at })
            )
            // map over the task note array and build an array of task notes, then sort by latest completed item
            resNotes = sortTaskNotesNewFirst(resNotes)
            const updatedString = resNotes.length ? resNotes[0].inserted_at : resolution.inserted_at
            const duration = moment().diff(moment(updatedString), 'minutes')
            const noteObject = mapNoteObject(resNotes)
            const newRes: Task = {
              id: resolution.id,
              name: resolution.name,
              active: resolution.active,
              inserted_at: resolution.inserted_at,
              notes: resNotes,
              noteObject,
              lastUpdated: duration,
            }
            newResolutionList.push(newRes)
          }
        })
        if (sortNewestFirst) {
          newResolutionList = sortTaskNewFirst(newResolutionList)
        } else {
          newResolutionList = sortTaskOldFirst(newResolutionList)
        }
        setTaskList([...newResolutionList]);
      }
    } catch (error) {
      alert('Error loading activity data!')
    }
    setLoading(false)
  }

  const addTask = async (name: string) => {
    if (name) {
      try {
        const { error } = await supabase
          .from('task')
          .upsert({ name, active: true, user_id: user?.id })
        getTaskList()
      } catch (error) {
        alert('Error creating data!')
      }
    } else {
      alert('Gotta enter a name to create a task!')
    }
  }
  const addTaskNote = async (taskId: string, note: string) => {
    if (taskId && note) {
      try {
        const { error } = await supabase
          .from('task_note')
          .upsert({ note, task_id: taskId, user_id: user?.id })

        getTaskList()
      } catch (error) {
        alert('Error creating data!')
      }
    } else {
      alert('Enter a task note')
    }
  }
  const setActive = async (id: string, active: boolean) => {
    console.log(id);

    try {
      const { error } = await supabase
        .from('task')
        .update({ active })
        .eq('user_id', user?.id)
        .eq('id', id)
      getTaskList()

    } catch (error) {
      alert('Error updating the active status!')
    }
  }
  return { taskList, addTask, addTaskNote, updateSort, setActive, newestFist: sortNewestFirst, loading }
}