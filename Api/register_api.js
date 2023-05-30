const db = require('../database/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const express = require('express')
const { sequelize } = require('../database/models');
const router = express.Router()
const saltRounds = 10;
const middlewareFunctions = require('../Api/middlewares_api')
const authenticate = middlewareFunctions.authenticate

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

router.get('/', async (req, res) => {
    const requestedEmail = req.query.email
    const requestedPassword = req.query.password
    const requestedUser = await db.peride_users.findOne({ where: { email: requestedEmail }})
    if(requestedPassword){
        if(requestedUser){
            const validPassword = await bcrypt.compare(requestedPassword, requestedUser.password)
            if(validPassword){
                const token = jwt.sign({ email: requestedEmail }, "SECRET")
                if(token) {
                    res.json({
                        success: true,
                        message: "Success!",
                        token: token,
                        id: requestedUser.id
                    })
                }
                else{
                    res.json({
                        success: false,
                        message: "Authentication failed."
                    })
                }
            }
            else{
                res.json({
                    success: false,
                    message: "Password is incorrect."
                })
            }
        }
        else{
            res.json({
                success: false,
                message: "Email doesn't exist."
            })
        } 
    }
    else {
        if(requestedUser) res.send({ success: false })
        else res.json({ success: true })
    }
})

router.get('/:id', authenticate ,async (req, res) => {
    const requestedUser = res.locals.user
    res.json({
        success: true,
        message: "Success!",
        period_length: requestedUser.period_length,
        cycle_length: requestedUser.cycle_length,
        luteal_phase_length: requestedUser.luteal_phase_length,
        birth_year: requestedUser.birth_year,
        smart_calculate: requestedUser.smart_calculate,
        irregular_cycles: requestedUser.irregular_cycles
    })
})

router.post('/', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds)
        await sequelize.transaction(async (t) => {
            const user = await db.peride_users.create({
                email: req.body.email,
                password: hash,
                period_length: req.body.period_length,
                cycle_length: req.body.cycle_length,
                birth_year: req.body.birth_year
            }, { transaction: t })
            await db.user_ext_info.create({
                id: user.id,
                device_type: req.body.device_type,
                device_id: req.body.device_id,
                onesignal_id: req.body.onesignal_id
            }, { transaction: t })  
            await db.user_periods.create({
                user_id: user.id,
                period_start: req.body.last_period_date,
                period_end: addDays(req.body.last_period_date, req.body.period_length)
            }, { transaction: t })  
            const token = jwt.sign({ email: req.body.email }, "SECRET")
            if(token){
                res.json({
                    message: "User successfully created.",
                    success: true,
                    token: token,
                    id: user.id
                })
            }
            else{
                res.json({
                    message: "User creation failed.",
                    success: false
                })
            }
        });
    } catch (error) {
        res.json({
            message: "User creation failed.",
            success: false
        })
    }
})

router.put('/:id', authenticate ,async (req, res) => {
    const requestedUser = res.locals.user
    const period_length = req.body.period_length
    const cycle_length = req.body.cycle_length
    const luteal_phase_length = req.body.luteal_phase_length
    const birth_year = req.body.birth_year
    const smart_calculate = req.body.smart_calculate
    const irregular_cycles = req.body.irregular_cycles

    try {
        await db.peride_users.update({
                period_length: period_length,
                cycle_length: cycle_length,
                luteal_phase_length: luteal_phase_length,
                birth_year: birth_year,
                smart_calculate: smart_calculate,
                irregular_cycles: irregular_cycles
            }, {
            where: { id: requestedUser.id }
        });
        res.json({
            message: "User profile update is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "User profile update failed.",
            success: false
        })
    } 
})

module.exports = { router }