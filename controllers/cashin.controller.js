
export const cashIn = async (req, res , next) => {
    const {userId, amount, referenceNumber } = req.body

    try {
        if(!userId || !amount || !referenceNumber) {
            return res.status(400).json({message: 'userId, amount, reference number are required'})           
        }

        const user = await User.findById(userId)

    } catch (error) {
        
        next()
    }
}