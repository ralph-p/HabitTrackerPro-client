import moment from "moment";
import { NoteObject, Task, TaskNote } from "../hooks/useTask.hooks";
export const MINUTES_IN_DAY = 1440;

export const formatDate = (dateString: string) => {
    return moment(dateString).format('DD/MMM/yy')
}

export const mapNoteObject = (taskNotes: TaskNote[]) => {
    const notes: NoteObject = {}
    taskNotes.forEach((note) => {
        const noteDate = formatDate(note.inserted_at)
        if (notes[noteDate]) {
            notes[noteDate].push(note.note)
        } else {
            notes[noteDate] = [note.note]
        }
    })
    return notes
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

export const getCardTheme = (lastUpdated: number) => {
    const days = lastUpdated / MINUTES_IN_DAY
    if (days < 1) {
        return { switchColor: 'cyan', cardColor: 'green.600' }
    }
    if (days < 3) {
        return { switchColor: 'teal', cardColor: 'yellow.400' }

    }
    return { switchColor: 'red', cardColor: 'red.200' }
}