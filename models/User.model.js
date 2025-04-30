import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0  // Ensuring the balance can't go below 0
    },
    transactions: [{
        referenceNumber: {
            type: String,
            required: true
            // Remove unique: true here because it's an array field and Mongoose doesn't support unique constraint on array items.
        },
        type: {
            type: String,
            enum: ['cashin', 'cashout'],
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0  // Ensuring the transaction amount can't be negative
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
