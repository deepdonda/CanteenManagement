var express = require('express')
var router = express.Router()
const adminController = require('../controller/adminController')
require('dotenv').config()

router.get('/abc', (req, res) => {
    console.log(process.env.ABC)
    console.log(process.env.PQR)
    res.send("hello get abc");
})



module.exports = router