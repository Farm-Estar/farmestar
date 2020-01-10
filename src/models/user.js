import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
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
        required: true,
        unique: true
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
    isLegalVerified: {
        type: String,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(uniqueValidator)

export const User = mongoose.model('users', userSchema);
