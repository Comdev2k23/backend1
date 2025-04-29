import User from "../models/User.model.js"

export const getUsers = (req, res) => {
    res.json({message: 'User route working from controller'})
}

export const createDummyUser = async (req, res, next) => {
    try{
        const user = new User({
            name: 'Jmba',
            balance: 500
        })

        await user.save()
        res.status(201).json({ message: 'Dummy user created', user })
    }
    catch(error){
        res.status(500).json({message: 'Failed to create dummy user', error: error.message})
        next()
    }
}

