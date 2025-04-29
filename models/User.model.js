import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    transactions: [{
        referenceNumber: String,
        type: {type: String},//cashin or cashout
        amount: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User