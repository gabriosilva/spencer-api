const mongoose = require('mongoose');
 
const messageSchema = new mongoose.Schema({
    title:{
        type:String,
        max:255,
        required:true,
    },
    body:{
        type:String,
        max:4000,
    },
    userId:{
        type:String,
        max:1024,
        required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

module.exports = mongoose.model('Note',messageSchema);