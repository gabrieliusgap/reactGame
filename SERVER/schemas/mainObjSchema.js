const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const mainObjSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    gold: {
        type: Number,
        required: true
    },
    sword: {
        type: Boolean,
        required: true
    },
    bow: {
        type: Boolean,
        required: true
    },
    wand: {
        type: Boolean,
        required: true
    },
    shield: {
        type: Boolean,
        required: true
    },
    chainMail: {
        type: Boolean,
        required: true
    },
    fullArmor: {
        type: Boolean,
        required: true
    },
    redPotion: {
        type: Boolean,
        required: true
    },
    greenPotion: {
        type: Boolean,
        required: true
    },
    bluePotion: {
        type: Boolean,
        required: true
    },









})

const mainObj = mongoose.model("reactGameUsers", mainObjSchema)

module.exports = mainObj