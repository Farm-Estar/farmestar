import mongoose from 'mongoose'

const farmProfileSchema = new mongoose.Schema({
    farmer: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    farm:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'farms'
    },
    displayName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export const FarmProfile = mongoose.model('profiles', farmProfileSchema)