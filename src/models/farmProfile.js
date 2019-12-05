import mongoose from 'mongoose'

const farmProfileSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const FarmProfile = mongoose.model('profiles', farmProfileSchema)