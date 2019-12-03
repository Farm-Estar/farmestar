import mongoose from 'mongoose'

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isFarmer: {
        type: String,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('users', userShema);
