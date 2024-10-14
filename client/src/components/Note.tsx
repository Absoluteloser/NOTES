// interface NoteItem {
//     id: number;
//     content: string;
//     important: boolean;
// }
// interface NoteProps {
//     note: NoteItem
//     toggleImportance: () => void
// }
// const Note = ({ note, toggleImportance }: NoteProps) => {
//     const label = note.important ? 'make not important' : 'make important'
//     return (
//         <li>
//             {note.content}
//             <button onClick={toggleImportance}>{label}</button>
//         </li>
//     )
// }

// export default Note

import React from 'react'
import { Note } from '../services/Service'

interface NoteProps {
    note: Note
    toggleImportance: () => void
}

const NoteComponent: React.FC<NoteProps> = ({ note, toggleImportance }) => {
    const label = note.important ? 'make not important' : 'make important'
    return (
        <li style={{ color: note.important ? 'red' : 'green' }}>
            {note.content}
            <button onClick={toggleImportance} style={{color:note.important ? 'red' : 'green'}}>{label}</button>
        </li>
    )
}

export default NoteComponent