import mongoose from "mongoose";
const { Schema, model } = mongoose

const workerSchema = new Schema({
    nome: {
        type: String, 
        
    }

})


const Worker = model('Worker', workerSchema, 'lavoratori')
export default Utente