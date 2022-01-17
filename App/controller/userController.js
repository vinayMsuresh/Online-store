const userModel = require('../Models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = (data) =>{
    let {firstname,
        lastname,
        email,
        password,
        gender,
        phone} = data;
    let ins_user = new userModel({first_name:firstname,last_name:lastname,email:email,password:password,
    gender:gender,phone_no:phone});
    return ins_user.save();
}

const userData = (email)=>{
    return userModel.findOne({email:email}).exec();
}
const adddata=(data,email)=>{
    let address=data.address;
    let pincode=data.pincode;
    let city=data.city;
    let state=data.state;
    let country=data.country;
    let data1={address_line:address,pincode:pincode,city:city,state:state,country:country};
    console.log(data1)
    userModel.updateOne({email:email},{$push:{address:data1}},(err)=>{
        if(err) {
            console.log(err)
        }
        else{

            console.log("updated data")
        }
    })
}
const editdata=(email,data)=>{
    userModel.updateOne({email:email},{$set:data},(err)=>{
        if(err) throw err;
      
    })
}


module.exports = {register, userData, editdata, adddata};