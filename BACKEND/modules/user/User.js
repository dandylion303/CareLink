import mongoose from "mongoose";
const { Schema, model } = mongoose

const userSchema = new Schema({

    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: [true, 'must write email']
    },
    password: {
        type: String,
        required: [true, 'must write password'],
        select: false,
    },

    role: {
        type: String,
        enum: ["admin", "sede"],
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
    sede: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Sede",
        required: function () {
            if (this.role === "sede") {
                return true
            } else {
                return false
            }
        },
    }
},
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password
                return ret
            }
        }

    })

const User = model('User', userSchema, 'utenti')
export default User