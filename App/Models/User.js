const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_no:{
        type:Number,
    },
    gender:{
        type:String,
    },
    password:{
        type:String,
    },
    address:{
        type:Array,
    },
    dob:{
        type:Date
    },
    profile_img:{
        type:String
    }
});

module.exports = mongoose.model("user", userSchema);