import express from 'express'
import { Router } from 'express'
import { clearAllTransactions, createDummyUser, deleteUser, deleteAllUsers, getTransactions, getUsers, deleteTransaction } from '../controllers/user.controller.js'
import { cashIn } from '../controllers/cashin.controller.js'
import { cashOut } from '../controllers/cashout.controller.js'
import { get } from 'mongoose'

const userRoutes = Router()

//Routes
userRoutes.get('/', getUsers)
userRoutes.post('/dummy', createDummyUser)
userRoutes.post('/cashin', cashIn)
userRoutes.post('/cashout', cashOut)
userRoutes.get('/transactions/:userId', getTransactions)
userRoutes.delete('/:userId/transactions/:transactionId', deleteTransaction)
userRoutes.post('/clear-transactions', clearAllTransactions)
userRoutes.delete('/:userId', deleteUser)
userRoutes.delete('/', deleteAllUsers)
export default userRoutes
