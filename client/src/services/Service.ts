// import axios from "axios"
// const baseURL = `http://localhost:3001/notes`
// interface newObject {
//     id: number;
//     content: string;
//     important: boolean
// }
// //    const url = `http://localhost:3001/notes/${id}`
// const getAll = async () => {
//     try {
//         const response = await axios.get(baseURL)
//         return response.data
//     }
//     catch (error) {
//         console.error(error)
//     }
// }

// const create = async (newObject: newObject) => {
//     try {
//         const request = await axios.post(baseURL, newObject)
//         return request.data
//     }
//     catch (error) {
//         console.error(error)
//     }
// }
// const update = async (id: number, newObject: newObject) => {
//     try {
//         const request = await axios.put(`${baseURL}/${id}`, newObject)
//         return request.data
//     }
//     catch (error) {
//         console.error(error)
//     }
// }
// //here update returns the promise so we should use .then immediately after it
// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }













// --------------------------------------------------------TOOK A LOT OF HELP FROM CLAUDE AND CODEIUM----------------------------
import axios from "axios"

const baseURL = `http://localhost:3001/api/notes`

export interface Note {
    id: number;
    content: string;
    important: boolean;
}

const getAll = async (): Promise<Note[]> => {
    try {
        const response = await axios.get<Note[]>(baseURL)
        return response.data
    } catch (error) {
        console.error('Error fetching notes:', error)
        throw error
    }
}

const create = async (newNote: Omit<Note, 'id'>): Promise<Note> => {
    try {
        const response = await axios.post<Note>(baseURL, newNote)
        return response.data
    } catch (error) {
        console.error('Error creating note:', error)
        throw error
    }
}

const update = async (id: number, updatedNote: Note): Promise<Note> => {
    try {
        const response = await axios.put<Note>(`${baseURL}/${id}`, updatedNote)
        return response.data
    } catch (error) {
        console.error(`Error updating note ${id}:`, error)
        throw error
    }
}

export default {
    getAll,
    create,
    update
}