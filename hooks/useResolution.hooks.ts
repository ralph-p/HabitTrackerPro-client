import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import moment from 'moment';
import { useEffect, useState } from 'react'
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
export const useResolution = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [resList, setResList] = useState<Task[] | []>([])

  useEffect(() => {
    if (user) {
      getResolutionList()
    }
  }, [user])

  const getResolutionList = async () => {
    try {
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
          const resNotes: TaskNote[] | [] = resolution.task_note?.map(
            (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at })
          ).sort((a, b) => moment(b.inserted_at).valueOf() - moment(a.inserted_at).valueOf())
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
        setResList([...newResolutionList.sort((a, b) => a.lastUpdated - b.lastUpdated)]);

      }
    } catch (error) {
      console.log(error);

      alert('Error loading activity data!')
    }
  }

  const addResolution = async (name: string) => {
    if (name) {
      try {
        const { error } = await supabase
          .from('task')
          .upsert({ name, active: true, user_id: user?.id })
        getResolutionList()
      } catch (error) {
        alert('Error creating data!')
        console.log(error);
      }
    } else {
      alert('Gotta enter a name to create a task!')
    }
  }
  const addResolutionNote = async (taskId: string, note: string) => {
    if (taskId) {
      try {
        const { error } = await supabase
          .from('task_note')
          .upsert({ note, task_id: taskId, user_id: user?.id })
        getResolutionList()
      } catch (error) {
        alert('Error creating data!')
        console.log(error);
      }
    } else {
      alert('Enter a name')
    }
  }
  return { taskList: resList, addResolution, addResolutionNote }
}