
const prisma = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createError = require("../utils/createError");


function checkEmailorMobile(identity) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10,15}$/

    let identityKey = ''
    if (emailRegex.test(identity)) {
        identityKey = 'email'
    }
    if (mobileRegex.test(identity)) {
        identityKey = 'mobile'

    } if (!identityKey) {
        createError(400, 'Only Email or Moblie phone wrong !!!!')
    }
    return identityKey
}



module.exports.register = async (req, res, next) => {
    try {
        const { identity, firstName, lastName, password, confirmPassword } = req.body;
        //validation
        if ((!identity.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim())) {
            return createError(400, "Please fill all data")
        }
        if (password !== confirmPassword) {
            return createError(400, "Please check confirm-Password")
        }

        //identity เป็น email | phone number
        const identityKey = checkEmailorMobile(identity)

        // หาว่ามี user นี้แล้วรึยัง

        const findIdentity = await prisma.user.findUnique({
            where: {
                [identityKey]: identity,
            }
        })
        if (findIdentity) {
            createError(409, `Already Have this user : ${identity}`)
        }

        console.log(findIdentity)

        const newUser = {
            [identityKey]: identity,
            password: await bcrypt.hash(password, 10),
            firstName: firstName,
            lastName: lastName,
        }
        console.log(newUser)

        const result = await prisma.user.create({ data: newUser })

        res.json({ msg: `Register Success` })

    } catch (err) {
        next(err)
    }


}
module.exports.login = async(req, res,next) => {
try {
    const { identity, password } = req.body;

    //validation
    if (!identity.trim() || !password.trim()) {
        createError(400, "Please fill all data ")
    }

    //check email or mobile
    //identity เป็น email | phone number
    const identityKey = checkEmailorMobile(identity)

    //find user
    const foundUser = await prisma.user.findUnique({
        where:{[identityKey]: identity}
    })
    console.log(foundUser)

    if(!foundUser){
        createError(401,"Invalid Login")
    }

    // Check password bcrypt มาช่วย
    let pwOk = await bcrypt.compare(password, foundUser.password)
    if(!pwOk){
        createError(401,"Invalid Login")
    }

    //create jsonwebtoken
    const payload = {id: foundUser.id}
    const token = jwt.sign(payload, process.env.JWT_SECRET,{
        expiresIn : '15d'})

    res.json({ msg: 'Login Successfully', token:token, user: foundUser })
} catch (error) {
    next(error)
}

}
module.exports.getMe = (req, res) => {
    res.json({ msg: 'Getme .....' })
}