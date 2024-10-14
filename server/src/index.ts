import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app = express()
const port = 3001
let notes = [
    {
        "id": "1",
        "content": "HTML is easy",
        "important": false
    },
    {
        "id": "2",
        "content": "Browser can execute only JavaScript",
        "important": false
    },
    {
        "id": "3",
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
    },
    {
        "id": "3c43",
        "content": "balaji",
        "important": true
    },
    {
        "id": "0184",
        "content": "nagesh motkulwar",
        "important": true
    },
    {
        "id": 353,
        "content": "alfdfd",
        "important": false
    },
    {
        "id": 212,
        "content": "gdff",
        "important": false
    },
    {
        "id": 522,
        "content": "dfd",
        "important": true
    },
    {
        "id": 223,
        "content": "fdfd",
        "important": false
    },
    {
        "id": 37,
        "content": "fdffdfdf",
        "important": true
    },
    {
        "id": 893,
        "content": "fdfdf",
        "important": true
    },
    {
        "id": 14,
        "content": "fdfdf",
        "important": true
    },
    {
        "id": 98,
        "content": "ffd",
        "important": false
    },
    {
        "id": "cf94",
        "content": "fdfdfd",
        "important": true
    },
    {
        "id": "f87c",
        "content": "rrtrtrt",
        "important": false
    },
    {
        "id": "8551",
        "content": "ffgfgfgfgfg",
        "important": false
    },
    {
        "id": "7718",
        "content": "dfd",
        "important": false
    },
    {
        "id": "c95e",
        "content": "dfdfdf",
        "important": true
    },
    {
        "id": "7e17",
        "content": "fdfdfdfdfdfdf",
        "important": false
    },
    {
        "id": "2140",
        "content": "fdfdfdfdfdfdfdfdfdf",
        "important": true
    }
]
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
app.use(cors())
const requestLogger=(req:Request,res:Response,next:NextFunction)=>{
    console.log(`the method is ${req.method}`)
    console.log(`the path is ${req.path}`)
    console.log(`the body of the request is ${req.body}`)
    console.log(`-----`)
    next()
}
app.use(express.json())
app.use(requestLogger)
const unknownEndpoint=(req:Request,res:Response)=>{
    res.status(404).send({
        error:"unknown endpoint"
    })
}
app.get('/', (req:Request, res:Response) => {
    res.send(`<h1>this is the home-page</h1>`)
})
app.get('/api/notes', (req:Request, res:Response) => {
    res.json(notes)
})
app.get('/api/notes/:id', (req:Request, res:Response) => {
    const id = req.params.id
    const noteindex = notes.findIndex(elem => elem.id === id)
    if (noteindex != -1) {
        const note = notes[noteindex]
        res.json(note)
    }
    else {
        res.status(404).json({ error: "the note you are trying to find is not found here" })
    }
})
//res.end is used in express and res.send in http 
const generateId=()=>{
    const maxId=notes.length>0?Math.max(...notes.map(elem=>Number(elem.id))):0
    return String(maxId+1)
}
app.post('/api/notes',(req:any,res:any)=>{
    const notesbody=req.body
    if(!notesbody.content){
        return res.status(404).json({
            error:"content missing"
        })
    }
    const note={
        content:notesbody.content,
        important:Boolean(notesbody.important),
        id:generateId()
    }
    notes.push(note)
    res.json(note)
})
app.delete('/api/notes/:id',(req:any,res:any)=>{
    const id=req.params.id
    notes=notes.filter(note=>note.id!==id)
    return res.status(204).end(
        console.log(`the note with id ${id} is deleted`)
    )
})
app.use(unknownEndpoint)
app.listen(port, () => {
    console.log(`the server is listening at port ${port}`)
})