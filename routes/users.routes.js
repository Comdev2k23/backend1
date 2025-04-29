import express from 'express'
import { Router } from 'express'
import { createDummyUser, getUsers } from '../controllers/user.controller.js'

const userRoutes = Router()

//Routes
userRoutes.get('/', getUsers)
userRoutes.post('/dummy', createDummyUser)


export default userRoutes
