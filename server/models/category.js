const mongoose = require('mongoose'),
    mongooseUniqueValidator = require('mongoose-unique-validator'),
    Schema = mongoose.Schema

const categorySchema = new Schema({
    description:{
        type:String,
        unique:true,
        required:[true,'La descripcion es necesario']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
// categorySchema.plugin(mongooseUniqueValidator,{message:'{PATH} debe de ser unico por que este ya existe en la base de datos'})

module.exports = mongoose.model('Category',categorySchema)