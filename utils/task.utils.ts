import moment from "moment";
import { CardViewControls, Frequency, NoteObject, Task, TaskNote } from "../hooks/types/task";
export const MINUTES_IN_DAY = 1440;
export const SECONDS_IN_DAY = 86400;
export const seconds = 'seconds';
export const formatDate = (dateString: string) => {
  return moment(dateString).format('DD/MMM/yy')
}

export const mapNoteObject = (taskNotes: TaskNote[]) => {
  const notes: NoteObject = {}  
  taskNotes.forEach((note) => {
    const noteDate = formatDate(note.inserted_at)
    if (notes[noteDate]) {
      notes[noteDate].push(`${note.note} for ${note.time || 0} minutes`)
    } else {
      notes[noteDate] = [`${note.note} for ${note.time || 0} minutes`]
    }
  })
  return notes
}
export const mapSubTasks = () => {

}
export const sortTaskNotesNewFirst = (taskNotes: TaskNote[]) => {


  return taskNotes.sort((a, b) => moment(b.inserted_at).valueOf() - moment(a.inserted_at).valueOf())
}

export const sortTaskNotesOldFirst = (taskNotes: TaskNote[]) => {
  return taskNotes.sort((a, b) => moment(a.inserted_at).valueOf() - moment(b.inserted_at).valueOf())
}

export const sortTaskNewFirst = (tasks: Task[]) => {
  return tasks.sort((a, b) => a.lastUpdated - b.lastUpdated)
}
export const sortTaskOldFirst = (tasks: Task[]) => {
  return tasks.sort((a, b) => b.lastUpdated - a.lastUpdated)
}
export const filterTasks = (tasks: Task[], filterValue: CardViewControls): Task[] | [] => {
  switch (filterValue) {
    case CardViewControls.ACTIVE:
      return tasks.filter((task) => task.active === true)
    case CardViewControls.ARCHIVED:
      return tasks.filter((task) => task.active === false)
    default:
      return tasks;
  }
  return []
}
export const getCardTheme = (lastUpdated?: number) => {
  if (!lastUpdated) return { switchColor: 'grey', cardColor: 'green.600' }
  const days = lastUpdated / SECONDS_IN_DAY
  if (days < 1) {
    return { switchColor: 'blue', cardColor: 'green.600' }
  }
  if (days < 3) {
    return { switchColor: 'teal', cardColor: 'yellow.400' }

  }
  return { switchColor: 'red', cardColor: 'red.200' }
}

export const lastUpdated = (lastUpdated: number) => {
  const duration = moment.duration(lastUpdated, seconds)
  if (duration.days() > 0) {
    return `Updated: ${duration.days()}d ${duration.hours()}h ago`
  }
  if (duration.hours() > 0) {
    return `Updated: ${duration.hours()}h ${duration.minutes()}m ago`
  }
  return `Updated: ${duration.minutes()}m ago`
}

export const getfrequency = (task: Task) => {
  switch (task?.frequency) {
    case 0:
      return `${task.duration} min every day`
    case 1:
      return `${task.duration} min every week`
    case 2:
      return `${task.duration} min every month`
    default:
      return '';
  }
}