const express = require('express'),
    User=require('../models/user'),
    app = express(),
    bcrypt = require('bcrypt')
app.get('/',(req,res)=>{
    res.json({
        name:'Thom'
    })
})
.post('/user',(req,res)=>{
    let body = req.body,
        user = new User({...body})
        user.password=bcrypt.hashSync(body.password,10) // 10 significara el numero de veces que se aplicara este hash
    user.save((err,userDB)=>{ // esto puede recibir un callback que es un error o un usuario de la base de datos que es una respuesta 
    //que es el usuario que se grabo en mongo
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
.put('/user/:id',(req,res)=>{
    let id = req.params.id
    let body = req.body

    // Esto podria ser una salida para que no se pueda actualizar el password y google
    //pero imagemos que tenemos muchos mas campos, esto seria una perdida de tiempo
    // delete body.password
    // delete body.google

    //para esto usaremos underscorejs.org
    
    
    User.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,userDB)=>{ // el new nos dira que hara un refresh para ver la //
        //data actualizada y el runValidators para que en la actualizacion tambien tome en cuenta las validaciones de la Schema

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