import moment, { unitOfTime } from "moment";
import { CardViewControls, Frequency, FrequencyEnum, FrequencyString, NoteObject, Subtask, Task, TaskNote } from "../hooks/types/task";
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
export const sortSubtaskNewFirst = (subtasks: Subtask[]) => {


  return subtasks.sort((a, b) => moment(b.inserted_at).valueOf() - moment(a.inserted_at).valueOf())
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

export const getPercentDone = (taskNotes: TaskNote[], duration: number, frequency: FrequencyEnum) => {
  const today = new Date()
  let notesInRange: TaskNote[] = []
  switch (frequency) {
    case 0:
      notesInRange = taskNotes.filter((note) => moment(note.inserted_at).isSame(today, 'day'))

      break
    case 1:
      notesInRange = taskNotes.filter((note) => moment(note.inserted_at).isSame(today, 'week'))

      break
    case 2:
      notesInRange = taskNotes.filter((note) => moment(note.inserted_at).isSame(today, 'month'))

      break
    default:
      break;
  }
  const amountComplete = notesInRange.reduce((accumulator, note) => {
    return accumulator + (note.time || 0);
  }, 0);

  return (amountComplete / duration) * 100
}

export const getTaskObjectFromDTO = (taskDTO: {
  id: any;
} & {
  name: any;
} & {
  active: any;
} & {
  inserted_at: any;
} & {
  name: any;
} & {
  description: any;
} & {
  updated_at: any;
} & {
  frequency: any;
} & {
  duration: any;
} & {
  task_note: ({
    id: any;
  } & {
    note: any;
  } & {
    inserted_at: any;
  } & {
    time: any;
  })[] | null;
}) => {
  if (Array.isArray(taskDTO.task_note)) {
    let taskNotes: TaskNote[] | [] = taskDTO.task_note.map(
      (n) => ({ id: n.id, note: n.note, inserted_at: n.inserted_at, time: n.time })
    )
    // map over the task note array and build an array of task notes, then sort by latest completed item
    taskNotes = sortTaskNotesNewFirst(taskNotes)
    const updatedString = taskNotes.length ? taskNotes[0].inserted_at : taskDTO.inserted_at
    const lastUpdatedDuration = moment().diff(moment(updatedString), seconds)
    const percentComplete = getPercentDone(taskNotes, taskDTO.duration, taskDTO.frequency)
    const newTask: Task = {
      id: taskDTO.id,
      name: taskDTO.name,
      active: taskDTO.active,
      inserted_at: taskDTO.inserted_at,
      notes: taskNotes,
      description: taskDTO.description,
      lastUpdated: lastUpdatedDuration,
      duration: taskDTO.duration,
      frequency: taskDTO.frequency,
      percentComplete,
    }
    return newTask;
  }
}