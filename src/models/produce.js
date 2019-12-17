import mongoose from 'mongoose'

const produceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('produce', produceSchema);