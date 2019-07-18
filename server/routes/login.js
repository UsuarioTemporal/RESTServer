const express = require('express'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    app = express(),
    jwt = require('jsonwebtoken')

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

        let token = jwt.sign({
            userDB
        },'este-es-el-seed-desarrollo',{expiresIn:process.env.CADUCIDAD_TOKEN})// 60s * 60min * 24h * 30dias = conversion de mili a dias(30) 
        // la firma(este-es ...) 
        //el token que obtenga debo guardarlo en el local storage por que tenemos que enviarlo de alguna manera para que las
        // peticiones que requiran de autentificacion confirmen este token , si el token no es valido no podrá accesar al servicio 


        res.json({
            ok:true,
            userDB,
            token
        })
        
    })

})

module.exports = app