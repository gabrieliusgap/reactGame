const mainObjDB = require('../schemas/mainObjSchema')

// import { nanoid } from 'nanoid'
const {nanoid} = require('nanoid')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    createUser: async (req, res) => {

        console.log(req.body);
        let user = await mainObjDB.find({username: req.body.name})
        console.log(user)
        if (user[0]) {
            console.log("already exist")
            return res.send({error: true, message: "User already exist"})
        } else {
            bcrypt.hash(req.body.pass1, saltRounds, function (err, hash) {
                console.log(err)
                console.log(hash)
                let obj = new mainObjDB
                obj.username = req.body.name
                obj.password = hash
                obj.secretKey = nanoid()
                obj.image = "https://images-na.ssl-images-amazon.com/images/I/51rTZsj-BOL._AC_UY445_.jpg"
                obj.health = 100
                obj.gold = 100
                obj.sword = false
                obj.bow = false
                obj.wand = false
                obj.shield = false
                obj.chainMail = false
                obj.fullArmor = false
                obj.redPotion = false
                obj.greenPotion = false
                obj.bluePotion = false


                obj.save().then(() => {
                    res.send({error: false, message: "User was created"})
                }).catch(e => {
                    res.send({error: true, message: e})
                })
            });


        }
    },
    checkUser: async (req, res) => {
        console.log(req.body.secret)

        let user = await mainObjDB.find({secretKey: req.body.secret})
        console.log(user[0])
        if (user[0]) {
            res.send({error: false, message: "User Exist", loggedUser: user[0].username})
        } else {
            res.send({error: true, message: "User Doesn't Exist"})
        }


    },
    loginUser: async (req, res) => {
        console.log(req.body)
        // let trigger=false
        let user = await mainObjDB.find({username: req.body.name})
        console.log(user[0])
        if (user[0]) {
            bcrypt.compare(req.body.pass, user[0].password, function (err, result) {
                console.log(result)
                if (result) {
                    res.send({
                        error: false,
                        message: "You Are Logged In",
                        loggedUser: user[0].username,
                        secret: user[0].secretKey,
                        img: user[0].image,
                    })
                } else {
                    res.send({error: true, message: "Password Doesn't Match"})
                }
            });
        } else {
            res.send({error: true, message: "User Doesn't Exist"})
        }
    },

    addGold: async (req, res) => {
        console.log(req.body);
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempGold = user[0].gold

        await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold +100})
        res.send({error: false, message: "Gold Added"})

    },
    addHealth: async (req, res) => {
        console.log(req.body);
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempHealth = user[0].health
        // await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: tempHealth +50})

        await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: 100})
        res.send({error: false, message: "Health Added"})

    },
    buyItem: async (req, res) => {
        console.log(req.body);
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempGold = user[0].gold

        if (req.body.name === "sword" && user[0].sword === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "bow" && user[0].bow === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "wand" && user[0].wand === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "shield" && user[0].shield === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "chain mail" && user[0].chainMail === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "full armor" && user[0].fullArmor === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "red potion" && user[0].redPotion === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "green potion" && user[0].greenPotion === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }
        if (req.body.name === "blue potion" && user[0].bluePotion === true) {
            return res.send({error: true, message: "You Already Have This Item"})
        }

        if (req.body.name === "sword" && user[0].sword === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {sword: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "bow" && user[0].bow === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {bow: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "wand" && user[0].wand === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {wand: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "shield" && user[0].shield === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {shield: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "chain mail" && user[0].chainMail === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {chainMail: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "full armor" && user[0].fullArmor === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {fullArmor: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "red potion" && user[0].redPotion === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {redPotion: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "green potion" && user[0].greenPotion === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {greenPotion: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }
        if (req.body.name === "blue potion" && user[0].bluePotion === false && tempGold >= req.body.price) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {bluePotion: true})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold - req.body.price})


            res.send({error: false, message: "Item Bought"})
        }

        if (req.body.name === "sword" && user[0].sword === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "bow" && user[0].bow === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "wand" && user[0].wand === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "shield" && user[0].shield === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "chain mail" && user[0].chainMail === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "full armor" && user[0].fullArmor === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "red potion" && user[0].redPotion === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "green potion" && user[0].greenPotion === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }
        if (req.body.name === "blue potion" && user[0].bluePotion === false && tempGold < req.body.price) {
            res.send({error: true, message: "Not Enough Gold"})
        }









    },
    sellItem: async (req, res) => {
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempGold = user[0].gold

        if (req.body.name === "sword" && user[0].sword === false) {
            return res.send({error: true, message: "You Don't Have This Item"})
        }
        if (req.body.name === "bow" && user[0].bow === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "wand" && user[0].wand === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "shield" && user[0].shield === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "chain mail" && user[0].chainMail === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "full armor" && user[0].fullArmor === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "red potion" && user[0].redPotion === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "green potion" && user[0].greenPotion === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }
        if (req.body.name === "blue potion" && user[0].bluePotion === false) {
            return res.send({error: true, message: "You Don't Have This Item"})        }






        if (req.body.name === "sword" && user[0].sword === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {sword: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "bow" && user[0].bow === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {bow: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold  + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "wand" && user[0].wand === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {wand: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "shield" && user[0].shield === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {shield: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "chain mail" && user[0].chainMail === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {chainMail: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "full armor" && user[0].fullArmor === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {fullArmor: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold  + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "red potion" && user[0].redPotion === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {redPotion: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold  + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "green potion" && user[0].greenPotion === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {greenPotion: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold  + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }
        if (req.body.name === "blue potion" && user[0].bluePotion === true) {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {bluePotion: false})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold + req.body.sellPrice})
            res.send({error: false, message: "Item Sold"})
        }






    },
    getUserData: async (req, res) => {

        let tempUserData = await mainObjDB.find({secretKey: req.body.secret})
        console.log(tempUserData[0].image)
        let dataByUser = {
            name: tempUserData[0].username,
            gold: tempUserData[0].gold,
            health: tempUserData[0].health,
            image: tempUserData[0].image,
            sword: tempUserData[0].sword,
            bow: tempUserData[0].bow,
            wand: tempUserData[0].wand,
            shield: tempUserData[0].shield,
            chainMail: tempUserData[0].chainMail,
            fullArmor: tempUserData[0].fullArmor,
            redPotion: tempUserData[0].redPotion,
            greenPotion: tempUserData[0].greenPotion,
            bluePotion: tempUserData[0].bluePotion,


        }


        res.send({error: false, message: "Data Sent", data: {dataByUser}})

    },

    getLeaders: async (req, res) => {

        let tempUserData = await mainObjDB.find()
        let leadersData=[]
        for (let i = 0; i < tempUserData.length; i++) {
            leadersData.push({name: tempUserData[i].username,
                gold: tempUserData[i].gold}
            )
        }


        res.send({error: false, message: "Data Sent", data: {leadersData}})

    },
    changeImg: async (req, res) => {
        console.log(req.body);

        await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {image: req.body.image})
        res.send({error: false, message: "Image Changed"})

    },
    changeName: async (req, res) => {
        console.log(req.body);

        await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {username: req.body.name})
        res.send({error: false, message: "Name Changed"})

    },
    drinkPotion: async (req, res) => {
        console.log(req.body);
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempHealth = user[0].health
        let tempPotionName= req.body.name
        if(tempHealth+req.body.heals>100){
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: 100})
        } else {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: tempHealth +req.body.heals})

        }



        if (req.body.name === "red potion"){
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {redPotion: false})
        }
        if (req.body.name === "green potion"){
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {greenPotion: false})
        }
        if (req.body.name === "blue potion"){
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {bluePotion: false})
        }



        res.send({error: false, message: "Health Updated"})

    },

    attack: async (req, res) => {
        console.log(req.body);
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempHealth = user[0].health
        let tempGold = user[0].gold

        if(tempHealth-req.body.damage<=0){
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: 0})
        }
        if(tempHealth-req.body.damage>100){
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: 100})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold+req.body.bonus})
        }
        else {
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: tempHealth-req.body.damage})
            await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold+req.body.bonus})

        }

        res.send({error: false, message: "Hit Done"})

    },
    newGame: async (req, res) => {
        console.log(req.body);
        let user = await mainObjDB.find({secretKey: req.body.secret})
        let tempGold = user[0].gold


        await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {health: 100})
        await mainObjDB.findOneAndUpdate({secretKey: req.body.secret}, {gold: tempGold-50})









        res.send({error: false, message: "New Game Started"})

    },







 }

