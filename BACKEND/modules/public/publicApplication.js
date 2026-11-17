import mongoose from 'mongoose'


const { Schema, model } = mongoose
const ApplicationSchema = new Schema({
    request: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Request",
        required: true
    },
    sede: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Sede',
        required: true,
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    message: {
        type: String,
        trim: true,
    },
    privacyConsent: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (value) {
                if (value === true) {
                    return true
                } else { return false }
            },
            message: 'necessario approvare il consenso al trattamento dei dati personali'
        }
    }

},
    { timestamps: true })


const Application = model('Application', ApplicationSchema, 'candidature')
export default Application