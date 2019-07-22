const express = require('express'),
    app = express(),
    fs = require('fs'),
    {verifyTokenImg} = require('../middlewares/authentication')


app.get('/image/:type/:nameImg',verifyTokenImg,(req,res)=>{
    let {type,nameImg} = req.params,
        pathImg = `${__dirname}/../../uploads/${type}/${nameImg}`
        
    if(fs.existsSync(pathImg)) return res.sendFile(pathImg)
    let notImagePath = `${__dirname}/../assets/no-image.jpg`
    res.sendFile(notImagePath)
})

module.exports = app