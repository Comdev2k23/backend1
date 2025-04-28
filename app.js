import express from 'express'
import userRoutes from './routes/users.routes.js'


const app = express()

//Middleware to parse json
app.use(express.json())

//Routes
app.use('/api/users', userRoutes)

//Start server

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))