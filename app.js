import express from 'express'
import userRoutes from './routes/users.routes.js'
import mongoose from 'mongoose'


const app = express()

// Middleware to parse JSON
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the ECASH API!')
})
app.use('/api/users', userRoutes)

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

// ✅ Export app for Vercel
export default app
