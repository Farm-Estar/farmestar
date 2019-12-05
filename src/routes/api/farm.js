import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import mailer from 'nodemailer'
import transport from 'nodemailer-sendgrid-transport'
import keys from '../../config/keys'


//Validation

//Models
import { Farm } from '../../models/farm'
import { FarmProfile } from '../../models/farmProfile'

var farms = express.Router()


// @route POST api/farm/add
// @desc Add a new Farm
// @access Public
farms.post("/add", (req, res) => {
    //Perform Validation Here

    const farm = new Farm({
        farmName: req.body.farmName,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        farmerType: req.body.farmerType
    })

    //Save new farm to the DB
    farm
      .save()
      .then(res.json("Farm added succesfuly"))
      .catch(err => res.json(err))
})

// @route POST api/farm/addProfile
// @desc Add a new farm profile
// @access Public
farms.post("/addProfile", (req, res) => {
    //Perform Validation Here

    const profile = new FarmProfile({
        displayName: req.body.displayName,
        description: req.body.description,
        image: req.body.image
    })

    //Save new farmer profile to the DB
    profile
      .save()
      .then(res.json("Farmer Profile added succesfuly"))
      .catch(err => res.json(err))
})

export { farms }