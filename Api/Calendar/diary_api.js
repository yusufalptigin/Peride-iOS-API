const middlewareFunctions = require('../middlewares_api')
const db = require('../../database/models')
const express = require('express')
const authenticate = middlewareFunctions.authenticate
const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedDate = req.query.date

    try {
        const requestedDiary = await db.user_diaries.findOne( { where: { 
            user_id: requestedUser.id,
            diary_date: requestedDate
        } } )
        res.json({
            message: requestedDiary.diary_entry,
            success: true
        })
    } catch (error) {
        res.json({
            message: "Couldn't find diary for this date.",
            success: false
        })
    }
})

router.post('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedDiaryEntry = req.body.diary_entry
    const requestedDate = req.body.diary_date

    try {
        await db.user_diaries.create({
            user_id: requestedUser.id,
            diary_entry: requestedDiaryEntry,
            diary_date: requestedDate
        })
        res.json({
            message: "Diary addition is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Diary addition failed.",
            success: false
        })
    }
})

router.put('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedDiaryEntry = req.body.diary_entry
    const requestedDate = req.body.diary_date
    try {
        await db.user_diaries.update({ diary_entry: requestedDiaryEntry }, {
            where: {
                user_id: requestedUser.id,
                diary_date: requestedDate
            }
        });
        res.json({
            message: "Diary update is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Diary update failed.",
            success: false
        })
    }
})

router.delete('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedDate = req.query.date
    
    try {
        await db.user_diaries.destroy({
            where: {
                user_id: requestedUser.id,
                diary_date: requestedDate
            }    
        })
        res.json({
            message: "Diary deletion is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Diary deletion failed.",
            success: false
        })
    }
})

module.exports = { router }