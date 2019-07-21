const express = require('express'),
    {verifyToken,verifyRole} = require('../middlewares/authentication'),
    app = express(),
    Category= require('../models/category')

//mostrar todas las categorias
app.get('/category',verifyToken,(req,res)=>{
    Category.find({})
    .sort('description')
    .populate('user','name email') // lo que hara esto identificar si hay algun ObjectId que contenga informacion adicional que luego podemos necesitar mostrar
    .exec((err,categoryDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        if(!categoryDB) return res.status(400).json({
            ok:false,
            err:{
                message:'Error al consultar'
            }
        })
        return res.json({
            ok:true,
            categoryDB
        })
    })
})

//mostrar una categoria por id
app.get('/category/:id',verifyToken,(req,res)=>{
    let id = req.params.id
    Category.findById(id,(err,categoryDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        if(!categoryDB) return res.status(400).json({
            ok:false,
            err:{
                message:`No existe La categoria con el id : ${id}`
            }
        })
        return res.json({
            ok:true,
            categoryDB
        })
    })
})
//crear nueva categoria
app.post('/category',[verifyToken,verifyRole],(req,res)=>{
    const {description} = req.body,
        category = new Category({
            description,
            user:req.userDB._id
        })
    category.save((err,categoryDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err,
            message:'Error en el servidor categoria'
        })
        if(!categoryDB) return res.status(400).json({
            ok:false,
            err,
            message:'No se creo la categoria'
        })
        return res.json({
            ok:true,
            categoryDB
        })
    })
})


//actulizar la categoria
app.put('/category/:id',[verifyToken,verifyRole],(req,res)=>{
    let id = req.params.id,
        body = req.body

    let descripCategory = {
        description:body.description
    } 
    Category.findByIdAndUpdate(id,descripCategory,{new:true,runValidators:true},(err,categoryDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err,
            message:'Error en la base de datos'
        })
        if(!categoryDB) return res.status(400).json({
            ok:false,
            err,
            message:'No se puedo actualizar'
        })

        return res.json({
            ok:true,
            categoryDB
        })
    })
})

//eliminar categoria
app.delete('/category/:id',[verifyToken,verifyRole],(req,res)=>{
    let id = req.params.id
    Category.findByIdAndRemove(id,(err,categoryDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        if(!categoryDB)return res.status(400).json({
            ok:false,
            err:{
                message:` el id : ${id} , no existe`
            }
        })
        return res.json({
            ok:true,
            categoryDB,
            message:'Categoria borrada'
        })
    })
})

module.exports = app