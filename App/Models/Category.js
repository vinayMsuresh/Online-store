const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        require:true,
        unique:true
    },
    product_image:{
        type:String,
        require:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("category", categorySchema);