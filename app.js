import express from 'express'
import userRoutes from './routes/users.routes.js'
import mongoose from 'mongoose'

const app = express()

//Middleware to parse json
app.use(express.json())

//Routes
app.use('/api/users', userRoutes)


// MongoDB connection
mongoose.connect('mongodb+srv://nachttv22:nachttv22@cluster0.eupf1ds.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB Atlas ✅')
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas ❌', error)
})

//Start server

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))