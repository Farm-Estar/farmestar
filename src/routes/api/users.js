import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import mailer from 'nodemailer'
import transport from 'nodemailer-sendgrid-transport'
import keys from '../../config/keys'

const stripe = require("stripe")("sk_test_GFG8Z3zu7QO66KUwd4yQYX9B00TvN3UNJb")
require('babel-polyfill')

//Validation
import { validateRegistrationInput } from '../../validation/register'
import { validateLoginInput } from '../../validation/login'
// import { validateForgotPassword } from '../../validation/forgot_password'

//Model
import { User } from '../../models/user'
import { Token } from '../../models/token'
import { Farm } from '../../models/farm'
import { FarmProfile } from '../../models/farmProfile'
import { Produce } from '../../models/produce'

//Create Email Transport to be used Globally
const transporter = mailer.createTransport(
    transport({
        auth: {
            api_key: keys.sendgridKey
        }
    })
)

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
                return res.status(400).json({ email: "Email already exists" })
            } else {
                const newUser = new User({
                    name: req.body.name,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    isFarmer: req.body.isFarmer,
                    password: req.body.password
                })

                //Hash the Password before DB Peristance
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.json(user)
                            })
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
    //Setup Payload for user dashbaord
    const payload = {
        user: {
            id: "",
            name: "",
            email: ""
        },
        token: "",
        isFarmer: "",
        success: false,
        farms: [],
        produce: [],
        reviews: [],
        profiles: []
    }
    //Find user by email
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" })
            }

            //Set User Details
            payload.user.id = user.id
            payload.user.name = user.name
            payload.user.email = user.email
            payload.user.isFarmer = user.isFarmer


            //Verify Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //Sign Token
                        jwt.sign(payload.user, keys.secretOrKey,
                            {
                                expiresIn: 31556926 //1 year
                            },
                            (err, token) => {
                                //Get Farms
                                Farm.find({}, function (err, farms) {
                                    farms.forEach(function (farm) {
                                        payload.farms.push(farm)
                                    })

                                    FarmProfile.find({}, function (err, profiles) {
                                        profiles.forEach(function (profile) {
                                            payload.profiles.push(profile)
                                        })

                                        Produce.find({}, function (err, produce) {
                                            produce.forEach(function (item) {
                                                payload.produce.push(item)
                                            })

                                            //Set Payload
                                            payload.success = true
                                            payload.token = "Bearer " + token


                                            res.json(payload)
                                        })
                                    })
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

// @route POST api/users/forgotPassword
// @desc Request a token to reset password
// @access Public
users.post("/forgotPassword", (req, res) => {
    //Check User Exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                //Create verification token for user
                var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') })

                //Save Token
                token.save()
                //Send email with verify token
                const options = {
                    to: user.email,
                    from: 'admin@farmestar.com',
                    subject: 'FarmEstar, Reset Password',
                    html: 'Hello,\n\n' + 'We have been notified that you requested to reset your password. Please do so following this url: \nhttp:\/\/' + req.headers.host + '\/updatePassword\/' + token.token + '.\n',
                }
                transporter.sendMail(options, (err, resp) => {
                    if (err) {
                        console.log(err.message)
                    } else {
                        console.log('A verification email has been sent to ' + user.email + '.')
                    }
                })
                res.json(user)
            } else {
                //User Error
                return res.status(400).json({ email: "Email does not exist" })
            }
        })
})

// @route POST api/users/updatePassword
// @desc Verify Token and Reset Password
// @access Public
users.post("/updatePassword", (req, res) => {
    // const { errors, isValid } = validateForgotPassword(req.body)

    //Check Validation
    // if (!isValid) {
    //     return res.status(400).json(errors)
    // }

    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) {
            return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' })
        } else {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (!user) {
                    return res.status(400).send({ type: 'no-email', msg: 'This user could not be found. Please try again.' })
                } else {
                    const newUser = new User({
                        name: user.name,
                        email: user.email,
                        password: req.body.password,
                        isFarmer: user.isFarmer
                    })
                    //Hash Password before persisting back to DB
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user.email + ' has updated their password succesfully.')
                                })
                                .catch(err => res.json(err))
                        })
                    })
                }
            })
        }

    })
})

// @route POST api/users/charge
// @desc Make chare to stripe
// @Access Private
users.post("/charge", async (req, res) => {
    try {
        let {status} = await stripe.charges.create({
          amount: req.body.total,
          currency: "usd",
          description: "Farm Estar Purchase",
          source: req.body.tokenId
        });
    
        res.json({status});
      } catch (err) {
        console.log(err);
        res.status(500).end();
      }
})

// @route GET api/users/dashboard
// @desc Get the Farms and Reviews for Dashboard
// @access Public
users.get("/dashboard", (req, res) => {
    var payload = {
        farms: [],
        reviews: []
    }

    //Get Farms
    Farm.find({}, function (err, farms) {
        farms.forEach(function (farm) {
            payload.farms.push(farm)
        })
        res.send(payload)
    })
})

export { users }


