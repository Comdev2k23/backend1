import express from 'express'
import { Router } from 'express'
import { getUsers } from '../controllers/user.controller.js'

const userRoutes = Router()

//Routes
userRoutes.get('/', getUsers)



export default userRoutes
