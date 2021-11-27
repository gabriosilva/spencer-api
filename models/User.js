const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        min:6,
        max:255
    },
    email:{
        type:String,
        required:true,
        unique:true,
        min:6,
        max:255
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024,
    },
    notes:[{
        type:mongoose.Schema.ObjectId,
        ref:"Note"
    }],
    date:{
        type:Date,
        defaut:Date.now
    }
});

module.exports = mongoose.model('User',userSchema);