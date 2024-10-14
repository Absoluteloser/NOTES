// import axios from "axios"
// import { useEffect, useState } from "react"
// interface Note {
//   id: string;
//   content: string;
// }
// const App = () => {
//   const [notes, setNotes] = useState<Note[]>([])
//   const [error, setError] = useState<string | null>(null)
//   useEffect(() => {
//     axios.get(`http://localhost:3001/notes`)
//       .then((response) => {
//         console.log(response.data)
//         setNotes(response.data)
//       })
//       .catch((err) => {
//         console.error(`error fetching data ${err}`)
//         setError(`error fetching data`)
//       })
//     axios.get(`http://localhost:3001/foobar`)
//       .then((response) => {
//         console.log(response.data)
//       })
//       .catch((err) => {
//         console.error(err)
//       })
//   }, [])
//   return (
//     <div>
//       {error &&
//         <p style={{ color: 'red' }}>{error}</p>
//       }
//       {
//         notes.length > 0 ?
//           notes.map((note) => {
//             return <p key={note.id}>
//               {note.content}
//             </p>
//           }) : (
//             <p>NO NOTES AVAILABLE</p>
//           )
//       }
//     </div>
//   )
// }

// import { useEffect, useState, FormEvent } from "react"
// // export default App
// import noteService from '../src/services/Service'
// import Note from "./components/Note";

// interface Note {
//   id: number;
//   content: string;
//   important: boolean;
// }
// //data fetching from server -->server data format is id,content
// const App = () => {
//   const [notes, setNotes] = useState<Note[]>([])
//   const [err, setErr] = useState<null | string>(null)
//   const [newNote, setNewNote] = useState<string>('')
//   const [showAll, setShowALl] = useState<boolean>(false)
//   useEffect(() => {
//     // const fetchData = async () => {
//     //   try {
//     //     const response = await axios.get(`http://localhost:3001/notes`)
//     //     console.log(response.data)
//     //     setNotes(response.data)
//     //   }
//     //   catch (error) {
//     //     console.log(error)
//     //     setErr(`error finding data`)
//     //   }
//     // }
//     // fetchData()
//     const fetchData = async () => {
//       try {
//         const notes = await noteService.getAll()
//         setNotes(notes)
//       }
//       catch (err: any) {
//         setErr(err?.message)
//       }
//     }
//     fetchData()
//   }, [])
//   const addNote = (event: FormEvent) => {
//     event.preventDefault()
//     const noteObject = {
//       id: Math.floor(Math.random() * 1000),
//       content: newNote,
//       important: Math.random() > 0.5,
//     }
//     noteService.create(noteObject).then(response => {
//       setNotes(notes.concat(response.data))
//       setNewNote('')
//     })
//   }
//   const toggleImportance = () => {
//     setShowALl(!showAll)
//   }
//   const handleChange = (event: FormEvent) => {
//     const target = event.target as HTMLInputElement
//     setNewNote(target.value)
//   }
//   const toggleImportanceof = (id: number) => {
//     const note = notes.find(note => note.id === id)
//     //typescript error here
//     if (!note) {
//       console.error(`Note with id ${id} not found`)
//       return
//     }
//     const changedNote = { ...note, important: !note.important }
//     noteService.update(id, changedNote).then((response) => {
//       const index = notes.findIndex(note => note.id === id)
//       if (index !== -1) {
//         const updatedNotes = [...notes]
//         updatedNotes[index] = response.data
//         setNotes(updatedNotes)
//       }
//     })
//       .catch(error => {
//         if (note) {  // Ensure note is defined before accessing content
//           alert(`The note '${note.content}' was already deleted from the server`)
//         } else {
//           alert(`The note was already deleted from the server`)
//         }
//         console.error(error)
//         setNotes(notes.filter(note => note.id !== id)) // Remove the deleted note from state
//       })
//   }
//   const notesToShow = showAll ? notes : notes.filter((note) => note && note.important !== undefined && note.important)
//   return (
//     <div>
//       <h1>Notes</h1>
//       <h4>This part shows all the notes whether they are important or not</h4>
//       {err ? (
//         // If error exists, render an error message
//         <p style={{ color: 'red' }}>{err}</p>
//       ) : (
//         notes.length > 0 ? (
//           // If no error and notes are present, render the notes
//           notes.map((note) => (
//             <p key={note.id}>{note.content}</p>
//           ))
//         ) : (
//           // Fallback message if no notes are available and no error
//           <p>No notes available</p>
//         )
//       )}
//       <h4>This part only show the important notes</h4>
//       <button onClick={toggleImportance}>
//         show {showAll ? 'important' : 'all'}
//       </button>
//       <form onSubmit={addNote}>
//         <input type="text" value={newNote} onChange={handleChange} />
//         <button type="submit" onClick={addNote}>add</button>
//       </form>
//       <ul>
//         {
//           notesToShow.length > 0 ? (
//             notesToShow.map((note) => (
//               note ? (
//                 <Note
//                   key={note.id}
//                   note={note}
//                   toggleImportance={() => toggleImportanceof(note.id)}
//                 />
//               ) : null
//             ))
//           ) : (
//             <p>No important notes available</p>
//           )
//         }
//       </ul>

//     </div>
//   )
// }

// export default App







import React, { useEffect, useState, FormEvent } from "react"
import noteService, { Note } from '../src/services/Service'
import NoteComponent from "./components/Note"
import './App.css'

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [newNote, setNewNote] = useState<string>('')
  const [showAll, setShowAll] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotes = await noteService.getAll()
        setNotes(fetchedNotes)
      } catch (error) {
        setErr('Error fetching notes')
      }
    }
    fetchData()
  }, [])

  const addNote = async (event: FormEvent) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }
    try {
      const createdNote = await noteService.create(noteObject)
      setNotes(notes.concat(createdNote))
      setNewNote('')
    } catch (error) {
      setErr('Error adding note')
    }
  }

  const toggleImportance = () => {
    setShowAll(!showAll)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = async (id: number) => {
    const note = notes.find(n => n.id === id)
    if (!note) {
      console.error(`Note with id ${id} not found`)
      return
    }
    const changedNote = { ...note, important: !note.important }
    try {
      const updatedNote = await noteService.update(id, changedNote)
      setNotes(notes.map(note => note.id !== id ? note : updatedNote))
    } catch (error) {
      setErr(`Note '${note.content}' was already deleted from server`)
      setNotes(notes.filter(n => n.id !== id))
    }
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div className="container">
      <h1 className="title">Notes</h1>
      {err && <p className="error">{err}</p>}
      <h4 className="subtitle">All notes</h4>
      <ol className="list">
        {notes.map((note) => (
          <li key={note.id} className="list-item">{note.content}</li>
        ))}
      </ol>
      <h3 className="total-notes">You have a total of {notes.length} notes</h3>
      <h4 className="subtitle">YOU ARE SEEING {showAll ? 'all notes' : 'important notes only'}</h4>
      <button onClick={toggleImportance} className="button">
        Show {showAll ? 'important' : 'all'}
      </button>
      <form onSubmit={addNote} className="form">
        <input
          type="text"
          value={newNote}
          onChange={handleChange}
          placeholder="Write a note"
          className="input"
        />
        <button type="submit" className="submit-button">Add</button>
      </form>
      <ol className="list">
        {notesToShow.map((note) => (
          <NoteComponent
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ol>
    </div>
  )
}

export default App
