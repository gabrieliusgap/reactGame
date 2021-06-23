
const express = require('express')
const cors = require("cors")
const app = express()

require('dotenv').config()
const mongoose = require('mongoose')
const mainRouter = require('./routes/router')
const mainObjDB = require('./schemas/mainObjSchema')
app.listen(8082)
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then( () => {
        console.log('Connection was successful')
    })
    .catch(e => {
        console.log('Error while connecting to db')
    })




app.use(['/'], mainRouter)




















// app.post('/setRecipe', (req, res) => {
//     console.log(req.body)
//
//
//
//     let newRecipe = new mainObjDB
//
//     newRecipe.title = req.body.title
//     newRecipe.photo = req.body.photo
//     newRecipe.ingridients = req.body.ingridients
//     newRecipe.preparation = req.body.preparation
//     newRecipe.reviews = []
//     newRecipe.fav = true
//
//
//     newRecipe.save().then(data => {
//         console.log(data)
//         res.send({success: true})
//
// })})
//
//
//
// app.get('/getAllData', async (req, res) => {
//
//     let result = await mainObjDB.find()
//
//
//
//
//         res.send({success: true, result})
//
//
//
//
//     })
//
// app.get('/getFavorites', async (req, res) => {
//     let result = await mainObjDB.find({fav:true})
//         res.send({success: true, result})
//
// })
//
//
//
// app.get('/getSingleData/:id', async (req, res) => {
//     console.log(req.params.id)
//
//     let result = await mainObjDB.find({_id: req.params.id})
//
//     res.send({success: true, result})
//
// })
//
//
// app.post('/setReview', async (req, res) => {
//     console.log(req.body)
//
//     const {id, email, star, reviewText} = req.body
//     const rew = {
//         email,
//         star,
//         reviewText
//     }
//     const updated = await mainObjDB.findOneAndUpdate({_id: id}, {$push: {reviews: rew}}, {new: true})
//     res.send({success: true, recipe: updated})
//
// })
//
// app.get('/search/:id', async (req, res) => {
//     console.log(req.params.id)
//     let result =[]
//     let allFromDB = await mainObjDB.find()
//     for (let i = 0; i < allFromDB.length ; i++) {
//         for (let j = 0; j < allFromDB[i].ingridients.length; j++) {
//             allFromDB[i].ingridients[j].name.toLowerCase().includes(req.params.id.toLowerCase()) ? result.push(allFromDB[i]):null
//         }
//
//     }
//
//     res.send({success: true, result})
//
// })
//
// app.get('/setFavToOpposite/:id', async (req, res) => {
//     console.log(req.params.id)
//     const {id} = req.params
//     const recipe = await mainObjDB.findOne({_id: id})
//     const updated = await mainObjDB.findOneAndUpdate({_id: id}, {$set: {fav: !recipe.fav}}, {new: true})
//     res.send({success: true, recipe: updated})
//
// })