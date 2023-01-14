import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
export type Resolution = {
  id: string;
  name: string;
  active: boolean;
  inserted_at: string;
  lastUpdated?: string;
  notes?: ResolutionNote[];
}
export type ResolutionNote = {
  id: string;
  note: string;
  inserted_at: string;
}
export const useResolution = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  // const [resList, setResList] = useState([])
  const [resList, setResList] = useState<Resolution[] | []>([])

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
        let newResolutionList: Resolution[] = []
        data.map((resolution) => {
          const resNotes: ResolutionNote[] | [] = resolution.task_note?.map((n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at }))
          const newRes: Resolution = {
            id: resolution.id,
            name: resolution.name,
            active: resolution.active,
            inserted_at: resolution.inserted_at,
            notes: resNotes,
            // notes: resolution.task_note?.map((n) => { note: n.note })
          }
          // getResolutionNotes(resolution.id).then((notes) => {
          //   let newResolutionNotes: ResolutionNote[] = []
          //   console.log(notes);

          //   notes?.map((note) => {
          //     const newNote: ResolutionNote = {
          //       id: note.id,
          //       note: note.note,
          //       inserted_at: note.inserted_at,
          //     }
          //     newResolutionNotes.push(newNote)

          //   })
          //   newRes.notes = newResolutionNotes;
          // })
          newResolutionList.push(newRes)
        })
        // console.log(data);

        setResList([...newResolutionList]);

      }
    } catch (error) {
      console.log(error);

      alert('Error loading activity data!')
    }
  }

  const getResolutionNotes = async (taskId: string) => {
    try {
      let { data, error, status } = await supabase
        .from('task_note')
        .select(`id, note, inserted_at, updated_at`)
        .eq('user_id', user?.id)
        .eq('task_id', taskId)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        return data;

      }
    } catch (error) {
      alert('Error fetching data')
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
  return { resolutionList: resList, addResolution, getResolutionNotes, addResolutionNote }
}