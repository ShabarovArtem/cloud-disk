const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const router = new Router()

router.post("/register",
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12}),
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(400).json({message: "Uncorrect request", errors})
        }

        const {name, email, password} = req.body

        const candidate = User.findOne({email})

        if (candidate) {
            return res.status(400).json({message: `User with email ${email} already exists`})
        }
        const hashPassword = await bcrypt.hash(password, 15);
        const user = new User({email, password: hashPassword})
        await user.save()
        return res.json({message: `User was created`})

    } catch (e) {
      console.error(e)
      res.status(400).send({message: "Server Error"})
    }
})

module.exports = router;

