import User from "../models/User.model.js"

export const cashOut = async (req, res, next) => {
    const {userId, referenceNumber, amount} = req.body

    try {
        if(!userId || !amount || !referenceNumber){
            res.status(404).json({message: 'userId, amount, reference number are required'})
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



        user.balance += amount

        user.transactions.push(({
            referenceNumber,
            type: 'cashout',
            amount
        }))

        await user.save()

        res.status(200).json({message: "Cash-out successful", balance: user.balance})

    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({message: 'The Reference number is already used'})
        }
        res.status(500).json({message: "Cash-out transaction failed", error: error.message})
      next()
    }
}