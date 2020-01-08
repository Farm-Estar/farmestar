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
import { Produce } from '../../models/produce'

var farms = express.Router()


// @route POST api/farm/add
// @desc Add a new Farm
// @access Public
farms.post("/add", (req, res) => {
    //Perform Validation Here

    const farm = new Farm({
        farmer: req.body.farmer,
        farmName: req.body.farmName,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        imageUrl: req.body.imageUrl,
        farmerType: req.body.farmerType
    })

    //Save new farm to the DB
    farm
        .save()
        .then(farm => {
            res.json(farm)
        })
        .catch(err => res.json(err))
})

// @route POST api/farm/addProfile
// @desc Add a new farm profile
// @access Public
farms.post("/addFarmProfile", (req, res) => {
    //Perform Validation Here

    const profile = new FarmProfile({
        farmer: req.body.farmer,
        farm: req.body.farm,
        displayName: req.body.displayName,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    })

    //Save new farmer profile to the DB
    profile
        .save()
        .then(profile => {
            res.json(profile)
        })
        .catch(err => res.json(err))
})


// @route GET api/farm/farms
// @desc Get all farms
// @access Public
farms.get("/farms", (req, res) => {
    const payload = {
        farms: []
    }

    //Get Farms
    Farm.find({}, function (err, farms) {
        farms.forEach((farm) => {
            payload.farms.push(farm)
        })

        res.json(payload)
    })
})

// @route POST api/farm/farmProfile
// @desc Get a farm profile
// @access Public
farms.post("/farmProfile", (req, res) => {
    const farm_id = req.body.farm_id

    //find farm profile from farm id
    FarmProfile.findOne({ 'farm': farm_id }, function (err, profile) {
        res.json(profile)
    })
        .catch(err => res.json(err))
})

// @route POST api/farm/addProduce
// @desc add a new produce to farm
// @access Public
farms.post("/addProduce", (req, res) => {
    const produce = new Produce({
        farm: req.body.farm,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        sku: req.body.sku
    })

    //Add Produce with mapping to the farm
    produce
        .save()
        .then(item => {
            res.json(item)
        })
        .catch(err => res.json(err))
})

// @route POST api/farm/editProduct
// @desc edit a product from a farm
// @access Public
farms.post("/editProduct", (req, res) => {
    const product_id = req.body.product_id

    //Edit Product with mapping to the farm
    Produce.findOneAndUpdate({ _id: product_id },
        {
            $set:
            {
                farm: req.body.farm,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                sku: req.body.sku
            }
        }, { new: true }, (err, product) => {
            if (err) {
                res.json(err)
            }
            res.json("Product Updated Succesfully: " + JSON.stringify(product));
        })
})

// @route POST api/farm/deleteProduct
// @desc delete product from farm
// @access Public
farms.post("/deleteProduct", (req, res) => {
    const productId = req.body.productId


    //Delete Product from Farm
    Produce.findByIdAndDelete(productId, function (err) {
        if (err) res.json(err)
        res.json({ "message": "Successfully deleted item: " + productId })
    })
})

export { farms }