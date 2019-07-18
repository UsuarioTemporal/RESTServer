const express = require('express'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    app = express()

app.post('/login',(req,res)=>{
    let body = req.body

    User.findOne({email:body.email},(err,userDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        if(!userDB) return res.status(400).json({
            ok:false,
            err:{
                message:'(Usuario) o contraseña incorrectos'
            }
        })
        if(!bcrypt.compareSync(body.password,userDB.password)) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario o (contraseña) incorrecto'
                }
            })
        }
        return res.json({
            ok:true,
            userDB,
            token:'123'
        })
        
    })

})

module.exports = app