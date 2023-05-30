const middlewareFunctions = require('../middlewares_api')
const db = require('../../database/models')
const express = require('express')
const authenticate = middlewareFunctions.authenticate
const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedMedicines = await db.user_medicines.findAll( {
        raw: true,
        where: { user_id: requestedUser.id } 
    } )

    if (requestedMedicines) {
        const Medicine = class {
            constructor(medicine_name, medicine_info_string) {
              this.medicine_name = medicine_name;
              this.medicine_info_string = medicine_info_string;
            }
        };
        var medicinesArray = new Array();
        for (let i = 0; i < requestedMedicines.length; i++) {
            const medicine_name = requestedMedicines[i].medicine_name
            const medicine_info_string = requestedMedicines[i].medicine_info_string
            medicinesArray.push(new Medicine(medicine_name, medicine_info_string))
        }
        res.json({
            medicines: medicinesArray,
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
    const requestedMedicineName = req.body.medicine_name
    const requestedMedicineInfo = req.body.medicine_info_string
    const requestedMedicine = await db.user_medicines.findOne( { where: { 
        user_id: requestedUser.id,
        medicine_name: requestedMedicineName
    } } )
    if (requestedMedicine) {
        res.json({
            message: "Medicine with this name already exists.",
            success: false
        })
    }
    else {
        try {
            await db.user_medicines.create({
                user_id: requestedUser.id,
                medicine_name: requestedMedicineName,
                medicine_info_string: requestedMedicineInfo
            })
            res.json({
                message: "Medicine addition is successfull.",
                success: true
            })
        } catch (error) {
            console.log(error)
            res.json({
                message: "Medicine addition failed.",
                success: false
            })
        }
    }
})

router.put('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedMedicineName = req.body.medicine_name
    const newMedicineName = req.body.new_medicine_name
    const newMedicineInfoString = req.body.new_medicine_info_string

    if (requestedMedicineName != newMedicineName) {
        const requestedMedicine = await db.user_medicines.findOne( { where: { 
            user_id: requestedUser.id,
            medicine_name: newMedicineName
        } } )
        if (requestedMedicine) {
            res.json({
                message: "Medicine with this name already exists.",
                success: false
            })
            return 
        }
    }
    try {
        await db.user_medicines.update({
                medicine_name: newMedicineName,
                medicine_info_string: newMedicineInfoString
            }, {
            where: { 
                user_id: requestedUser.id,
                medicine_name: requestedMedicineName 
            }
        });
        res.json({
            message: "Medicine update is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Medicine update failed.",
            success: false
        })
    } 
})

router.delete('/', authenticate, async (req, res) => {
    const requestedUser = res.locals.user
    const requestedMedicineName = req.query.medicine_name

    try {
        await db.user_medicines.destroy({
            where: {
                user_id: requestedUser.id,
                medicine_name: requestedMedicineName
            }    
        })
        res.json({
            message: "Medicine deletion is successfull.",
            success: true
        })
    } catch (error) {
        res.json({
            message: "Medicine deletion failed.",
            success: false
        })
    }
})

module.exports = { router }