const express = require('express'),
    User=require('../models/user'),
    app = express(),
    bcrypt = require('bcrypt'),
    _ = require('underscore'),
    pattern = /^[1-9]+[\d]*$/

app.get('/user',(req,res)=>{

    // este algorimo se utiliza para la paginacion en BD
    // la paginacion funciona de la siguiente manera
    // se necesita de la paginaActual  de cuando en cuanto quieres mostrar (n_datos)
    /**
     * comienzo = paginaActual*n_datos - n_datos
     * Si queremos mostrar de 5 en 5
     * Y nos encontramos en la primera paginaActual
     * comienzo = 1*5-5 = 0 + 1(sume este 1 para que comienze en 1 y no en 0 ) entonces mostraremos desde 1 hasta 5 , 
     * si quermps mostrar la siguiente pagina
     * comienzo = 2*5 -5 = 5 + 1 entonces mostrarmos desde 6 hasta 10 
     */

    const {from = 0,limit=5} = req.query

    if(!pattern.test(from)) return res.json({err:`from = ${from} no es un numero`})
    if(!pattern.test(limit)) return res.json({err:`limit = ${limit} no es un numero`})
    User.find({})
    .skip(+from -1)//esto me dice que se saltara los primeros 2 pero en este caso from
    .limit(+limit)//mostrar los dos que siguen
    .exec((err,users)=>{
        if(err) return res.status(400).json({
            ok:false,
            err
        })
        res.json({
            ok:true,
            users
        })
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
    let body = _.pick(req.body,['name','email','img','role','status'])//en el array se pondra toda las propiedades validas
    //con esto de arriba ya tenemos validados solos los atributos que si se pueden actualizar
    
    // let body = req.body

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