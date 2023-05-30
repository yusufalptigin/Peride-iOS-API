const jwt = require('jsonwebtoken')
const db = require('../database/models')

async function authenticate (req, res, next)  {
    const headers = req.headers['authorization']
    if(headers){
        const token = headers.split(' ')[1]
        try {
            const decodedToken = jwt.verify(token, 'SECRET')
            const userEmail = decodedToken.email
            const persistedUser = await db.peride_users.findOne({ where: { email: userEmail }})
            if(persistedUser){ 
                res.locals.user = persistedUser
                next() 
            }
            else{
                res.json({
                    success: false,
                    message: "User doesn't exist."
                })
            }
        } catch (error) {
            res.json({
                success: false,
                message: "Unauthorized access."
            })
        }
    }
    else{
        res.json({
            success: false,
            message: "Unauthorized access."
        })
    }
}

module.exports = { authenticate }