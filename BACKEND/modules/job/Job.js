import mongoose from "mongoose";
import { livelliInquadramento, tabelleInquadramento } from "../../config/options.js";



const { Schema, model } = mongoose
const jobSchema = new Schema({
    family: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Family',
        required: true
    },
    worker: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Worker',
        required: true
    },
    request: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Request',
        required: true
    },
    sede: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Sede',
        required: true
    },
    
    durationType: {
        type: String,
        enum: ['indeterminato', 'determinato'],
        required: true,
        default: 'indeterminato'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: function () {
            if (this.durationType === 'determinato'||this.status==='cessato') {
                return true
            } else {
                return false
            }
        }
    },
    status: {
        type: String, 
        enum: ['attivo', 'cessato'],
        required: true,
        default: 'attivo'
    },
    inquadramento: {
        type: String,
        enum: tabelleInquadramento,
        required: true
    },
    livello: {
        type: String,
        enum: livelliInquadramento,
        required: true
    },
    oreSettimanali: {
        type: Number,
        min: 1,
        max: 54,
        required: true
    },


},
{timestamps: true})


const Job = model('Job', jobSchema, 'contratti')
export default Job