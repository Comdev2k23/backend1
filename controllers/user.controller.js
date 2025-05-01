import User from "../models/User.model.js"

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.error('getUsers error:', error)
    res.status(500).json({ message: 'Server Error', error: error.message })
  }
}

export const createDummyUser = async (req, res) => {
  try {
    const user = new User({ name: 'comdev', balance: 5000 })
    await user.save()
    res.status(201).json({ message: 'Dummy user created', user })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create dummy user', error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params
  try {
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message })
  }
}

export const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({})
    res.status(200).json({ message: 'All users deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete all users', error: error.message })
  }
}

export const getTransactions = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ transactions: user.transactions, balance: user.balance })
  } catch (error) {
    res.status(500).json({ message: 'Failed to get transactions', error: error.message })
  }
}

export const deleteTransaction = async (req, res) => {
  const { userId, transactionId } = req.params
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const initialLength = user.transactions.length
    user.transactions = user.transactions.filter(tx => tx._id.toString() !== transactionId)

    if (user.transactions.length === initialLength) {
      return res.status(404).json({ message: 'Transaction not found' })
    }

    await user.save()
    res.status(200).json({ message: 'Transaction deleted successfully', transactions: user.transactions })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction', error: error.message })
  }
}

export const clearAllTransactions = async (req, res) => {
  const { userId } = req.body
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    user.transactions = []
    await user.save()
    res.status(200).json({ message: 'All transactions cleared', balance: user.balance })
  } catch (error) {
    res.status(500).json({ message: 'Failed to clear transactions', error: error.message })
  }
}
