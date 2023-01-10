import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export const useResolution = () => {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [resList, setResList] = useState([])
  useEffect(() => {
    if (user) {
      getResolutionList()
    }
  }, [user])

  const getResolutionList = async () => {
    try {
      let { data, error, status } = await supabase
        .from('task')
        .select(`id, name, active, inserted_at, name, updated_at`)
        .eq('user_id', user?.id)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        setResList([...data]);
      }
    } catch (error) {
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
        console.log(data);
        
      }
    } catch (error) {
      alert('Error fetching data')
    }
  }
  const addResolution = async (name: string) => {
    if(name) {
      try {
        const { error } = await supabase
        .from('task')
        .upsert({name, active: true, user_id: user?.id})
        getResolutionList()
      } catch (error) {
        alert('Error creating data!')
        console.log(error);
      }
    } else {
      alert('Enter a name')
    }
  }
  const addResolutionNote = async (taskId: string, note: string) => {
    if(taskId) {
      try {
        const { error } = await supabase
        .from('task_note')
        .upsert({note, task_id: taskId, user_id: user?.id})
        getResolutionNotes(taskId)
      } catch (error) {
        alert('Error creating data!')
        console.log(error);
      }
    } else {
      alert('Enter a name')
    }
  }
  return {resolutionList:resList, addResolution, getResolutionNotes, addResolutionNote}
}