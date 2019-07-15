const express = require('express'),
    User=require('../models/user'),
    app = express()
app.get('/',(req,res)=>{
    res.json({
        name:'Thom'
    })
})
.post('/user',(req,res)=>{
    let body = req.body,
        user = new User({...body})
    
    user.save((err,userDB)=>{ // esto puede recibir un callback que es un error o un usuario de la base de datos que es una respuesta que es el usuario que se grabo en mongo
        if(err) return res.status(400).json({
            ok:false,
            err
        })
            
        res.json({
            ok:true,
            user:userDB
        })
    })
})

module.exports=app