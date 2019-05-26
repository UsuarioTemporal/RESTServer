
/**
 * Un esquema puede referirse a una reperesentación visual a una bd , a un
 *  conjunto de reglas que rige una bd, o bien , a todo el conjunto de 
 * objetos que pertenen a un usuario en particular.
 * 
 * Representa una configuración lógica de todo o parte de una db 
 * relacional.Puede existir de dos formas : como reperesentacion visual y 
 * como un conjunto de fórmulas conocidas como restricciones de integridad
 */

const express = require('express'),
    port = require('./config/config'),
    mongoose=require('mongoose'),
    app = express(),
    print=console.log

mongoose.connect('mongodb://localhost:27017/coffe',(err,res)=>{
    if(err) throw err
    print('OK')
})


app.use(express.urlencoded({extended:false}))
app.use(require('./routes/user'))
.use(express.json())
.listen(port)