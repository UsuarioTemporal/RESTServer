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
    let nameFile = sampleFile.name.split('.').slice(-1)
    // Extensiones permitidas
    let validExtentions = ['png','jpg','gif','jpeg']

    if(validExtentions.indexOf(nameFile)<0) return res.status(400).json({
        ok:false,
        err:{
            message:'La extension no es correcta'
        }
    })

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