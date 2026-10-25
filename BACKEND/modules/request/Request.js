import mongoose from "mongoose";
import { regimes, jobTypes, selfSufficientLevel, cognitiveState, mobility, tabelleInquadramento, livelliInquadramento, maggiorazioni, statusRichiesta } from "../../config/options.js"

const isBabySitter = function () {
    if (this.serviceType === 'babysitter') {
        return true
    } else {
        return false
    }
}

const isBadante = function () {
    if (this.serviceType === 'badante') {
        return true
    } else {
        return false
    }
}

const { Schema, model } = mongoose
const requestSchema = new Schema({

    famiglia: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Family',
        required: true
    },
    serviceType: {
        type: String,
        enum: jobTypes,
        required: true
    },
    workRequest: {
        type: String,
        enum: regimes,
        required: true,
    },
    oreSettimanali: {
        type: Number,
        min: 1,
        required: true,
    },
    schedule: {
        lunedi: {
            type: Number,
            min: 0,
            max: 10,
        },
        martedi: {
            type: Number,
            min: 0,
            max: 10,
        },
        mercoledi: {
            type: Number,
            min: 0,
            max: 10,
        },
        giovedi: {
            type: Number,
            min: 0,
            max: 10,
        },
        venerdi: {
            type: Number,
            min: 0,
            max: 10,
        },
        sabato: {
            type: Number,
            min: 0,
            max: 10,
        },
        domenica: {
            type: Number,
            min: 0,
            max: 10,
        }
    },
    weekendNeeded: {
        type: Boolean
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
            if (this.durationType === 'determinato') {
                return true
            } else {
                return false
            }
        }
    },
    workAddress: {
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
    pets: {
        gatti: {
            type: Number,
            min: 0,
        },
        cani: {
            type: Number,
            min: 0,
        },
        altro: {
            type: String,
            trim: true
        }
    },
    requiredLanguage: {
        type: String,
        trim: true,
    },
    requiredDrivingLicense: {
        type: Boolean
    },
    notes: {
        type: String,
        trim: true
    },

    ///////////////---COLF---///////////////
    colfDetails: {
        specificCompetenceNeeded: {
            type: String,
            enum: ['cucina', 'giardino', 'autista']
        },
        otherStaff: {
            type: Boolean,
        },
        experienceRequired: {
            type: Boolean
        }
    },
    ///////////////---BABYSITTER---///////////////
    babySitterDetails: {
        numberOfChildren: {
            type: Number,
            min: 1,
            required: isBabySitter
        },
        dateOfBirthYoungest: {
            type: Date,
            required: isBabySitter
        },
        specialNeeds: {
            type: String,
            trim: true
        }
    },
    ///////////////---BADANTE---///////////////
    badanteDetails: {
        numberOfAssisted: {
            type: Number,
            min: 1,
            required: isBadante
        },
        mainAssistedName: {
            type: String,
            trim: true,
            required: isBadante
        },
        birthDate: {
            type: Date,
            required: isBadante,
        },
        selfSufficientLevel: {
            type: String,
            enum: selfSufficientLevel,
            required: isBadante
        },
        cognitiveState: {
            type: String,
            enum: cognitiveState,
            required: isBadante
        },
        mobility: {
            type: String,
            enum: mobility,
            required: isBadante
        },
        specialNeeds: {
            type: Boolean
        },
        therapiesDetail: {
            type: String,
            trim: true,
        },
        specialDiet: {
            type: String,
            trim: true,
        },
        sleepsAtNight: {
            type: Boolean
        }
    },
    ///////////////---DATI GENERICI---///////////////
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
    maggiorazioni: {
        type: [String], 
        enum: maggiorazioni
    },
    statusRichiesta: {
        type: String,
        enum: statusRichiesta,
        required: true,
        default: 'inAttesa'
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    publicDescription: {
        type: String,
        trim: true,
        required: function(){
            if(this.isPublic===true){
                return true
            } else{
                return false
            }
        }
    },
    sede: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Sede',
        required: true
    },



},
    { timestamps: true })


const Request = model('Request', requestSchema, 'richieste')
export default Request
