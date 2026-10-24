import mongoose from "mongoose";
const { Schema, model } = mongoose

const sedeSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    provincia: {
        type: String,
        required: true,
        uppercase: true,
        minlength: 2,
        maxlength: 2,
        trim: true,
    },

    city: {
        type: String,
        trim: true,
        required: true,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
    },

    isActive: {
        type: Boolean,
        required: true,
        default: true,
    }
},
{timestamps: true}
)



const Sede = model('Sede', sedeSchema, 'sedi')
export default Sede