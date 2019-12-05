import mongoose from 'mongoose'

const farmSchema = new mongoose.Schema({
    farmName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    farmerType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const Farm = mongoose.model('farms', farmSchema)