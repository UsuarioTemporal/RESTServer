const express = require('express'),
    fileUpload = require('express-fileupload'),
    app = express(),
    User = require('../models/user'),
    Product = require('../models/product'),
    fs = require('fs')

app.use(fileUpload())

// funcion para la eliminacion de una imagen
const deleteFile = (nameImg,type)=>{
    let pathImg = `${__dirname}/../../uploads/${type}/${nameImg}`
    if(fs.existsSync(pathImg)) fs.unlinkSync(pathImg)
}

// insertar imagen a usuario
const userImg = (id,res,fileName)=>{

    User.findById(id,(err,userDB)=>{
        if(err) {
            deleteFile(fileName,'users')
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!userDB) {
            deleteFile(fileName,'users')
            return res.status(400).json({
                ok:false,
                err:{
                    message:'el usuario no existe'
                }
            })
        }

        deleteFile(userDB.img,'users')
        userDB.img = fileName
        userDB.save((err,savedUser)=>{
            res.json({
                ok:true,
                user:savedUser,
                img: fileName
            })
        })
    })
}

//insertar imagen al producto
const productImg = (id,res,fileName)=>{
    Product.findById(id,(err,productDB)=>{
        if(err) {
            deleteFile(fileName,'products')
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!productDB){
            deleteFile(fileName,'products')
            return res.status(400).json({
                ok:false,
                err:{
                    message:'Usuario no existe'
                }
            })
        }
        deleteFile(productDB.img,'products')
        productDB.img=fileName
        productDB.save((err,savedProduct)=>{
            res.json({
                ok:true,
                product:savedProduct,
                img: fileName
            })
        })
    })
}

app.put('/upload/:type/:id',(req,res)=>{
    let files = req.files,
        type = req.params.type,
        id = req.params.id
    if(!files) return res.status(400).json({
        ok:false,
        message:'No se ha seleccioado ningun archivo'
    })

    // Validar el tipo
    let validTypes = ['product','user']
    if(validTypes.indexOf(type) < 0) return res.status(400).json({
        ok:false,
        err:{
            message:`Los tipos permitidos son ${validTypes.join(', ')}`,
            type
        }
    })

    let sampleFile = files.file // este file se lo pasaremos en el body
    let nameFile = sampleFile.name
    let extension = nameFile.split('.').slice(-1)
    // Extensiones permitidas
    let validExtentions = ['png','jpg','gif','jpeg']

    if(validExtentions.indexOf(extension)<0) return res.status(400).json({
        ok:false,
        err:{
            message:`La extension no es correcta , las extensiones permitidas son ${validExtentions.join(', ')}`,
            extension
        }
    })

    let nameRealFile = `${id}-${new Date().getMilliseconds()}.${extension}` 
    sampleFile.mv(`./uploads/${type}/${nameRealFile}`,err=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })

        if(type==='users') return userImg(id,res,nameRealFile)

        productImg(id,res,nameRealFile)
    })
})

module.exports = app