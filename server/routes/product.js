const mongoose = require('mongoose'),
    {verifyToken} = require('../middlewares/authentication'),
    express = require('express'),
    app = express(),
    Product = require('../models/product'),
    Category = require('../models/category')


//=========================
// Obtener todos los productos
//=========================

app.get('/products',verifyToken,(req,res)=>{
    //trae todos los productos
    //populate usuario y categoria
    //paginado
    let from = +(req.query.from || 0)
    Product.find({available:true})
            .sort()
            .skip(from)
            .limit(5)
            .populate('user','name email')
            .populate('category','description')
            .exec((err,productDB)=>{
                if(err) return res.status(500).json({
                    ok:false,
                    err
                })
                res.json({
                    ok:true,
                    productDB
                })
            })



    //obtener los productos por categorias si es que le pasa como parametro la categoria y la categoria debe existir
})

//Obtener un poducto por id
app.get('/product/:id',verifyToken,(req,res)=>{

    let id = req.params.id

    Product.find({_id:id,available:true})
    .sort('name')
    .populate('user','name email')
    .populate('category','description')
    .exec((err,productDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Error en el servidor/DB'
            }
        })
        if(!productDB) return res.status(400).json({
            ok:false,
            err:{
                message:`El id ${id} es incorrecto`
            }
        })
        
        return res.json({
            ok:true,
            productDB
        })
    })


})

// crear un nuevo producto
app.post('/product',verifyToken,(req,res)=>{
    //crear un producto
    //grabar usuario
    //grabar una categoria del lista
    const {name,unitPrice,category} = req.body,
        product = new Product({
            name,
            unitPrice,
            user:req.userDB._id,
            category
        })
    product.save((err,productDB)=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        if(!productDB) res.status(400).json({
            ok:false,
            err:{
                message:'Error al intentar crear un producto'
            }
        })
        return res.status(201).json({
            ok:true,
            productDB
        })
    })
})

////   actualizar producto
app.put('/product/:id',verifyToken,(req,res)=>{
    //grabar usuario
    //grabar una categoria del listado
    let id = req.params.id
    const body = req.body
})
app.delete('/product/:id',verifyToken,(req,res)=>{
    //grabar usuario
    // grabar una categoria del listado
})
///////////////////////////// PUT y DELETE Me aburrí de estar haciendo lo mismo una y otra vez
/////////////////7///////// si quieres mandarme un pull request con gusto lo aceptaré

app.get('/products/search/:term',(req,res)=>{
    let term = req.params.term
    let regex = new RegExp(term,'i')
    Product.find({name:regex})
        .populate('category','name')
        .exec((err,products)=>{
            if(err) return res.status(500).json({
                ok:false,
                err:{
                    message:'Error en el servidor'
                }
            })
            res.json({
                ok:true,
                products
            })
        })
})

module.exports = app