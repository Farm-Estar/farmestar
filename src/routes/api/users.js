import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import keys from '../../config/keys'

//Validation
import { validateRegistrationInput } from '../../validation/register'
import { validateLoginInput } from '../../validation/login'

//Model
import { User } from '../../models/user'

var users = express.Router()

// @route POST api/users.register
// @desc Register user
// @access Public
users.post("/register", (req, res) => {
    const { errors, isValid } = validateRegistrationInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    //Check against email if user exists
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"})
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            //Hash the Password before DB Peristance
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                       .save()
                       .then(user => res.json(user))
                       .catch(err => console.log(err))
                })
            })
        }
    })
})

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
users.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    //Find user by email
    User.findOne({ email })
    .then(user => {
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found"})
        }

        //Verify Password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                //Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                }

                //Sign Token
            jwt.sign(payload, keys.secretOrKey,
                {
                    expiresIn: 31556926 //1 year
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            } else {
                return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" })
            }
        })
    })
})

export { users }


