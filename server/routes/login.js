const express = require('express'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    app = express()

app.post('/login',(req,res)=>{
    res.json({
        ok:true
    })
})

module.exports = app