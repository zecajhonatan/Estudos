import express from 'express'
let router = express.Router()


router.get('/driveRegistration', (req, res) => {
    res.render('driver/driveRegistration.ejs')
})











export default router