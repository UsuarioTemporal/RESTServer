const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema
let validRoles = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un un rol valido'
}
let userSchema = new Schema({
    name:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    email:{
        type:String,
        required:[true,'el correo es necesario'],
        unique:true
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
        type:String,
        default:'USER_ROLE',
        enum:validRoles
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

userSchema.methods.toJSON=function(){
    let user = this,
        userObject=user.toObject()
    delete userObject.password
    return userObject
}

userSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser unico'}) //para agregar un message personalizado

module.exports=mongoose.model('User',userSchema)