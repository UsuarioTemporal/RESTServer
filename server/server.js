
/**
 * Un esquema puede referirse a una reperesentación visual a una bd , a un
 *  conjunto de reglas que rige una bd, o bien , a todo el conjunto de 
 * objetos que pertenen a un usuario en particular.
 * 
 * Representa una configuración lógica de todo o parte de una db 
 * relacional.Puede existir de dos formas : como reperesentacion visual y 
 * como un conjunto de fórmulas conocidas como restricciones de integridad
 */

require('./config/config')

const express = require('express'),
    mongoose=require('mongoose'),
    app = express()

mongoose.connect(process.env.URLDB,(err,res)=>{
    if(err) throw err
    console.log('OK')
})

// estos nos servira para obtener la informacion del post de manera procesada y serializarla en un objeto json 
app.use(express.urlencoded({extended:false})) 
.use(express.json())
/////////////////////////////////////////////////////////

// habilitar la carpeta public
app.use(express.static(`${__dirname}/../public`))

// Middleware para la configuracion global de rutas
app.use(require('./routes/index'))


app.listen(process.env.PORT,()=>`Escuchando en el puerto ${process.env.PORT}`)
