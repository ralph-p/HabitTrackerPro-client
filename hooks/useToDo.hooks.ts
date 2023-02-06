import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react"
import { useState } from "react"


export type ToDo = {
  id: string,
  name: string,
  active: boolean,
  inserted_at: string,
  subtask?: any[]
  description?: string,
  due_date?: string,
}
export const useToDo = () => {
  const supabase = useSupabaseClient()
  const session = useSession()
  const [toDoList, setToDoList] = useState<ToDo[] | []>([])
  const getToDoList = async () => {
    try {
      let { data, error, status } = await supabase
        .from('todo')
        .select(`id, 
        name, 
        active, 
        inserted_at, 
        name, 
        description, 
        due_date, 
        subtask(id, name, description, complete, inserted_at)
      `)
        .eq('user_id', session?.user?.id)
      if (error && status !== 406) {
        throw error
      }
      if (data) {
        let newToDoList: ToDo[] = []
        data.map((todoDTO) => {
          if (Array.isArray(todoDTO.subtask)) {
            let todo: ToDo = {
              id: todoDTO.id,
              name: todoDTO.name,
              active: todoDTO.active,
              inserted_at: todoDTO.inserted_at,
              subtask: todoDTO.subtask,
              description: todoDTO.description,
              due_date: todoDTO.due_date,
            }
            newToDoList.push(todo)
          }
        })
        setToDoList(newToDoList);
      }
    } catch (error) {

    }
  }

  const addToDo = async (name: string, description?: string, dueDate?: string,) => {
    if (name) {
      try {
        const { error } = await supabase
          .from('todo')
          .upsert({ name, active: true, user_id: session?.user?.id, description, due_date: dueDate })
      } catch (error) {
        alert('Error creating todo!')
      }
    } else {
      alert('Gotta enter a name to create a task!')
    }
  }

  return { addToDo, getToDoList, toDoList }
}