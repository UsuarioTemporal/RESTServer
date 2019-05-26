const mongoose = require('mongoose')
let Schema = mongoose.Schema
let userSchema = new Schema({
    name:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        required:[true,'el correo es necesario']
    },
    password : {
        type:String,
        required:[true,'La contraseña es obligatoria']
    },
    img:{
        type:String,
        required:false // no es obligatorio
    },
    role:{
        default:'USER_ROLE'
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})


module.exports=mongoose.model('User',userSchema)