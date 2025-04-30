import User from "../models/User.model.js"

export const cashIn = async (req, res , next) => {
    const {userId, amount, referenceNumber } = req.body

    try {
        if(!userId || !amount || !referenceNumber) {
            return res.status(400).json({message: 'userId, amount, reference number are required'})           
        }

        const user = await User.findById(userId)

        if(!user){
            res.status(404).json({message: 'User not found'})  
        }


        //Check if the reference number is already used
       const duplicateReferenceNumber = user.transactions.some(tx=> tx.referenceNumber === referenceNumber)
        if(duplicateReferenceNumber){
            return res.status(400).json({message: 'The Reference number is already used'})
        }

        if(user.balance  < amount) {
            return res.status(400).json({message: 'Insufficient balance'})
        }

        user.balance -= amount
        user.transactions.push({
            referenceNumber,
            type: 'cashin',
            amount
        })

        await user.save()

        res.status(200).json({message: 'Cash in successful', balance: user.balance})

    } catch (error) {
    
        res.status(500).json({message: 'Cash-in transaction failed', error: error.message})
        next()
    }
}