const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type:String,
        required: [true,'El nombre es necesario'],
        unique:true
    },
    unitPrice:{
        type:Number,
        require:[true,'El precio es necesario']
    },
    description:{
        type:String,
        required:false
    },
    available:{
        type:Boolean,
        required:true,
        default:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
module.exports = mongoose.model('Product',ProductSchema)