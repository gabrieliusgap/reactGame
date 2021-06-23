const express = require('express')
const router = express.Router()
const controller = require('../controllers/main')
const validator =  require ('../validators/validator')

router.post('/createUser', validator.registerName, validator.registerPass, controller.createUser)
router.post('/checkUser', controller.checkUser)
router.post('/loginUser', controller.loginUser)

router.post('/addGold', controller.addGold)
router.post('/addHealth', controller.addHealth)
router.post('/buyItem', controller.buyItem)
router.post('/sellItem', controller.sellItem)

router.post('/getUserData', controller.getUserData)
router.post('/getLeaders', controller.getLeaders)

router.post('/changeImg', controller.changeImg)
router.post('/changeName', controller.changeName)
router.post('/drinkPotion', controller.drinkPotion)

router.post('/attack', controller.attack)
router.post('/newGame', controller.newGame)










module.exports = router











//
//
// router.post('/createEntry', controller.createEntry)
// router.post('/getByUser', controller.getByUser)
// router.post('/entryBought', controller.entryBought)
// router.post('/deleteEntry', controller.deleteEntry)
