import mongoose from "mongoose";
import { regimes, acceptedPets, availableFor, experiencesWith, jobTypes, skills, conoscenzaLingua, documenti, certificazioni } from "../../config/options.js";


const { Schema, model } = mongoose
const workerSchema = new Schema({
    codiceFiscale: {
        type: String,
        trim: true,
        uppercase: true,
        minlength: 16,
        maxlength: 16,
        required: true
    },

    nome: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["M", "F", "Other"],
        required: true,
    },
    birthdate: {
        type: Date,
        required: true,
    },
    birthCountry: {
        type: String,
        required: true,
        trim: true,
    },
    citizenship: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    province: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 2,
        uppercase: true
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
    profileImage: {
        url: { type: String },
        publicId: { type: String },
    },

    ////////-----CURRICULUM-----////////

    jobTypes: {
        type: [String],
        enum: jobTypes,
        validate: {
            validator: function (value) {
                if (value.length > 0) {
                    return true
                } else {
                    return false
                }
            },
            message: 'scegli una opzione'
        }
    },

    regimes: {
        type: [String],
        enum: regimes,
        validate: {
            validator: function (value) {
                if (value.length > 0) {
                    return true
                } else {
                    return false
                }
            },
            message: 'seleziona il regime lavorativo'
        }
    },

    availableFor: {
        type: [String],
        enum: availableFor,
    },

    experienceWith: {
        type: [String],
        enum: experiencesWith,
    },

    skills: {
        type: [String],
        enum: skills,
    },

    acceptedPets: {
        type: [String],
        enum: acceptedPets,
    },

    smoker: {
        type: Boolean,
        default: false,
    },

    hasDrivingLicense: {
        type: Boolean,
        default: false,
    },

    hasCar: {
        type: Boolean,
        default: false,
    },

    yearsInItaly: {
        type: Number,
        min: 0,
        required: true,
    },

    languages: [
        {
            language: {
                type: String,
                trim: true,
                lowercase: true,
                required: true
            },

            level: {
                type: String,
                enum: conoscenzaLingua,
                required: true,
            },
        }

    ],

    hasReferences: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        min: 0,
        max: 10,
    },

    notes: {
        type: String,
        trim: true,
    },

    ////////-----DOCUMENTI-----////////
    documents: [
        {
            docType: {
                type: String,
                enum: documenti,
                required: true
            },
            docNumber: {
                type: String,
                trim: true,
                uppercase: true
            },
            scadenza: {
                type: Date,
            },
            fileUrl: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true
            }
        }
    ],
    ////////-----CERTIFICAZIONI-----////////
    certifications: [
        {
            certificationType: {
                type: String,
                enum: certificazioni,
                required: true,
            },
            enteCertificatore: {
                type: String,
                trim: true
            },
            oreCorso: {
                type: Number,
                required: [true, "indicare durata del corso in ore"],
                min: 0,
            },
            obtainedAt: {
                type: Date
            },
            certUrl: {
                type: String,
            },
            certPublicId: {
                type: String,
            },
            verified: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    ////////-----DATI DI SISTEMA-----////////

    sede: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Sede",
        required: true
    },
    status: {
        type: String,
        enum: ["disponibile", "non disponibile"],
        default: 'disponibile',
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
        consentDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    },

    warning:
    {
        isFlagged: {
            type: Boolean,
            default: false,
        },
        reason: {
            type: String,
            trim: true,
            required: function () {
                if (this.warning.isFlagged === true) {
                    return true
                } else {
                    return false
                }
            }
        },
        flaggedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: function () {
                if (this.warning.isFlagged === true) {
                    return true
                } else {
                    return false
                }
            }
        },
        flaggedAt: {
            type: Date,
            required: function () {
                if (this.warning.isFlagged === true) {
                    return true
                } else {
                    return false
                }
            }
        }
    },


},
    { timestamps: true })

workerSchema.index({
    codiceFiscale: 1,
    sede: 1
},
    { unique: true }
)
const Worker = model('Worker', workerSchema, 'lavoratori')
export default Worker