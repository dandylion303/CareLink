import mongoose from "mongoose";


const { Schema, model } = mongoose
const familySchema = new Schema({

    codiceFiscale: {
        type: String,
        required: true,
        minLength: 16,
        maxLength: 16,
        trim: true,
        uppercase: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerLastname: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    customerAddress: {
        address: {
            type: String,
            trim: true,
            required: true,
        },
        city: {
            type: String,
            trim: true,
            required: true,
        },
        provincia: {
            type: String,
            minLength: 2,
            maxLength: 2,
            trim: true,
            uppercase: true,
            required: true
        }
    },
    sede: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Sede",
        required: true
    },
    privacyConsent:
    {
        gdpr: {
            type: Boolean,
            required: true,
            validate: {
                validator: function (value) {
                    if (value === true) {
                        return true
                    } else { return false }
                },
                message: "necessario approvare GDPR"
            }
        },
        url: {
            type: String
        },
        publicId: {
            type: String
        },
        consentDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
},

    { timestamps: true })

familySchema.index({
    codiceFiscale: 1,
    sede: 1
},
    { unique: true }
)

const Family = model('Family', familySchema, 'famiglie')
export default Family