import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import initDatabaseConnection from './config/db.js'

const PORT = process.env.PORT||4444
const server = express()


const startServer = async ()=>{
    await initDatabaseConnection()
    server.listen(PORT, ()=>{
        console.log(`server up and running on port ${PORT}`)
    })
}

server.use(express.json())
server.use(cors())
server.get('/', (req, res)=>{
    res.status(200).json({message:'Entrypoint funzionante'})
})

startServer()

