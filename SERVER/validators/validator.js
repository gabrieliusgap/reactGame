let validator = {
    registerName: (req, res, next) => {
        console.log(req.body)

        if (typeof (req.body.name) !== "string" ||
        req.body.name.length < 4
        || req.body.name.length > 20) {
            return res.send({success: false, message: "UserName Not Correct"})
        }
        next()
    },
    registerPass: (req, res, next) => {
        console.log(req.body)
        let numTrigger = false
        let conditions = ["0" , "1" , "2" , "3", "4" , "5" , "6" , "7", "8" , "9"];

        conditions.map(item => req.body.pass1.includes(item)? numTrigger = true:null)
        console.log(numTrigger)

        if (typeof (req.body.pass1) !== "string" ||
            req.body.name.length < 4
            || req.body.name.length > 20 ||
        req.body.pass1 !== req.body.pass2 ||
           numTrigger === false
        )

         {
            return res.send({success: false, message: "Password Not Correct"})
        }
        next()
    },


}

module.exports = validator