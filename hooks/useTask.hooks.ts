import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import moment from 'moment';
import { useEffect, useState } from 'react'
import { sortTaskNotesNewFirst, sortTaskNotesOldFirst, sortTaskNewFirst, sortTaskOldFirst } from '../utils/task.utils';
export type Task = {
  id: string;
  name: string;
  active: boolean;
  inserted_at: string;
  lastUpdated: number;
  notes?: TaskNote[];
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
          // map over the task note array and build an array of task notes, then sort by latest completed item
          let resNotes: TaskNote[] | [] = resolution.task_note?.map(
            (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at })
          )
          resNotes = sortTaskNotesNewFirst(resNotes)
          const updatedString = resNotes.length ? resNotes[0].inserted_at : resolution.inserted_at
          const duration = moment().diff(moment(updatedString), 'minutes')

          const newRes: Task = {
            id: resolution.id,
            name: resolution.name,
            active: resolution.active,
            inserted_at: resolution.inserted_at,
            notes: resNotes,
            lastUpdated: duration,
          }
          newResolutionList.push(newRes)
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
        console.log(error);
      }
    } else {
      alert('Gotta enter a name to create a task!')
    }
  }
  const addTaskNote = async (taskId: string, note: string) => {
    if (taskId && note) {
      try {
        const { data, error } = await supabase
          .from('task_note')
          .upsert({ note, task_id: taskId, user_id: user?.id })
        console.log(data);

        getTaskList()
      } catch (error) {
        alert('Error creating data!')
        console.log(error);
      }
    } else {
      alert('Enter a task note')
    }
  }
  return { taskList, addTask, addTaskNote, updateSort, newestFist: sortNewestFirst, loading }
}