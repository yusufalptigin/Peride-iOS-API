const middlewareFunctions = require('../middlewares_api')
const db = require('../../database/models')
const express = require('express')
const authenticate = middlewareFunctions.authenticate
const router = express.Router()

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

router.get('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const user_periods = await db.user_periods.findAll( {
        raw: true,
        where: { user_id: requestedUser.id } 
    } )
    
    if (user_periods) {
        const Period = class {
            constructor(period_start, period_end) {
              this.period_start = period_start;
              this.period_end = period_end;
            }
        };
        var periodsArray = new Array();
        for (let i = 0; i < user_periods.length; i++) {
            const period_start = user_periods[i].period_start
            const period_end = user_periods[i].period_end
            periodsArray.push(new Period(period_start, period_end))
        }
        res.json({
            periods: periodsArray,
            success: true
        })
    }
    else {
        res.json({
            message: "Couldn't find medicine.",
            success: false
        })
    }
})

router.post('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const period_start = req.body.period_start
    const period_length = req.body.period_length
    try {
        await db.user_periods.create({
            user_id: requestedUser.id,
            period_start: period_start,
            period_end: addDays(period_start, period_length)
        })
        res.json({
            message: "Period addition is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Period addition failed.",
            success: false
        })
    }
})

router.put('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const period_start = req.query.period_start
    const new_period_end = req.query.new_period_end
    console.log(period_start)
    console.log(new_period_end)

    try {
        await db.user_periods.update({ period_end: new_period_end }, {
            where: {
                user_id: requestedUser.id,
                period_start: period_start
            }
        });
        res.json({
            message: "Period update is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Period update failed.",
            success: false
        })
    }
})

router.delete('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const period_start = req.query.date
    
    try {
        await db.user_periods.destroy({
            where: {
                user_id: requestedUser.id,
                period_start: period_start
            }    
        })
        res.json({
            message: "Period deletion is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Period deletion failed.",
            success: false
        })
    }
})

module.exports = { router }