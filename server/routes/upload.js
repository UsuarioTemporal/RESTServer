const express = require('express'),
    fileUpload = require('express-fileupload'),
    app = express()

app.use(fileUpload())

app.put('/upload',(req,res)=>{
    let files = req.files
    if(!files) return res.status(400).json({
        ok:false,
        message:'No se ha seleccinado ningun archivo'
    })
    let sampleFile = files.file // este file se lo pasaremos en el body
    sampleFile.mv('./uploads/filename.jpg',err=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        return res.json({
            ok:true,
            message:'Imagen subida correctamente'
        })
    })
})

module.exports = app