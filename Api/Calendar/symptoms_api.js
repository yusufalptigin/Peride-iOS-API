const middlewareFunctions = require('../middlewares_api')
const db = require('../../database/models')
const express = require('express')
const authenticate = middlewareFunctions.authenticate
const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedDate = req.query.date
    try {
        const requestedSymptoms = await db.user_symptoms.findOne( { where: { 
            user_id: requestedUser.id,
            symptoms_date: requestedDate
        } } )
        res.json({
            message: requestedSymptoms.symptoms_string,
            success: true
        })
    } catch (error) {
        res.json({
            message: "Couldn't find symptom for this date.",
            success: false
        })
    }
})

router.post('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedSymptomsString = req.body.symptoms_string
    const requestedDate = req.body.symptoms_date
    try {
        await db.user_symptoms.create({
            user_id: requestedUser.id,
            symptoms_string: requestedSymptomsString,
            symptoms_date: requestedDate
        })
        res.json({
            message: "Symptoms addition is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Symptoms addition failed.",
            success: false
        })
    }
})

router.put('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedSymptomsString = req.body.symptoms_string
    const requestedDate = req.body.symptoms_date
    try {
        await db.user_symptoms.update({ symptoms_string: requestedSymptomsString }, {
            where: {
                user_id: requestedUser.id,
                symptoms_date: requestedDate
            }
        });
        res.json({
            message: "Symptoms update is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Symptoms update failed.",
            success: false
        })
    }
})

router.delete('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedDate = req.query.date
    try {
        await db.user_symptoms.destroy({
            where: {
                user_id: requestedUser.id,
                symptoms_date: requestedDate
            }    
        })
        res.json({
            message: "Symptoms deletion is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Symptoms deletion failed.",
            success: false
        })
    }
})

module.exports = { router }