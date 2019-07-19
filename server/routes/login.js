const express = require('express'),
    bcrypt = require('bcrypt'),
    User = require('../models/user'),
    app = express(),
    jwt = require('jsonwebtoken'),
    {OAuth2Client} = require('google-auth-library'),
    client = new OAuth2Client(process.env.CLIENT_ID)

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
        },process.env.SEED,{expiresIn:process.env.CADUCIDAD_TOKEN})// 60s * 60min * 24h * 30dias = conversion de mili a dias(30) 
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

//configuraciones de google
const verify = async token=> {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    console.log(payload.name);
    console.log(payload.email);
    console.log(payload.picture);

    const userid = payload['sub'];
}

app.post('/google',(req,res)=>{
    let token = req.body.idtoken

    verify(token)
    .then(data=>console.log(data))
    .catch(err=>console.log(err))

    res.json({
        token
    })
})

module.exports = app