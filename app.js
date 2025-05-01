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
mongoose.connect('mongodb+srv://nachttv22:nachttv22@ecash.5u01dff.mongodb.net/ECASH?retryWrites=true&w=majority&appName=ecash', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas ✅'))
.catch((error) => console.error('MongoDB connection error ❌', error))

// ✅ Export app for Vercel
export default app
