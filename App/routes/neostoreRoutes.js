const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const catModel = require('../Models/Category');
const colorModel = require('../Models/Color');
const orderModel = require('../Models/order');
const productModel = require('../Models/Product');
const userModel = require('../Models/User');
const {editdata,adddata, userData} = require('../controller/userController');
const {validateUser, validateLogin,validateUpd,validateAddress} = require('../controller/Validator');
const {getCategoryProducts,getColorProducts,getAllCategories,getAllColors,getOrderById,getCart, getOrder, getOrd} = require('../controller/productController');
const transporter = require('../controller/EmailTransport');
const storage = require('../controller/MulterStoage');
const bcrypt = require('bcrypt');
const helpers = require('../helpers/helpers');
const authenticateToken = require('../controller/Token');
const saltRounds = 10;
const jwtsecret = 'anfksfderlkld9343kl';

router.use(express.static('uploads'));
router.post('/register',validateUser, (req, res)=>{
    let {firstname,
        lastname,
        email,
        password,
        gender,
        phone} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    let ins_user = new userModel({first_name:firstname,last_name:lastname,email:email,password:hash,
    gender:gender,phone_no:phone});
    ins_user.save((err)=>{
        if(err){
            res.json({err:"Registeration already done with this email",status_code:400})
        }
        else{
            res.json({msg:"Registered successfully",status_code:200});
        }
    });

});

router.post('/sociallogin', (req, res)=>{
    let{first_name, last_name, email} = req.body;
    const social_data = userData(email);
    social_data.then(response=>{
        // console.log(response);
        if(response.email){
            let payload={
                uid:email
            }
            const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
                res.json({msg: "Logged in successfully","token":token,userdata:response,status_code:200})
        }
        else{
            let ins_user = new userModel({first_name:first_name,last_name:last_name,email:email});
            ins_user.save((err)=>{
                if(err){
                    res.json({err:err,status_code:400})
                }
                else{
                    let payload={
                        uid:email
                    }
                    const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
                res.json({msg: "Logged in successfully","token":token,userdata:req.body,status_code:200})
                }
            });

        }
    })
})

router.post('/login', validateLogin,(req, res)=>{
    let{email, password} = req.body;
    const logindata = userData(email);
    logindata.then(response=>{
        if(response.email){
            if(bcrypt.compareSync(password, response.password)){
                let payload={
                    uid:email
                }
                const token = jwt.sign(payload, jwtsecret,{expiresIn:3600000})
                res.json({msg: "Logged in successfully","token":token,userdata:response,status_code:200})
            }
            else{
                res.json({err:"Password Error",status_code:400})
            }
        }
        else{
            res.json({err:"Email doesn't exists",status_code:400});
        }
    })
})
router.get('/forgot/:email',(req, res)=>{
    let email = req.params.email;
    let mailOptions = {
            from: 'naganandams16@gmail.com',
            to: email,
            subject: 'Password change for Neostore',
            html: `<p>Please find attached link for resetting the password
            </p><a href="http://localhost:3000/forgotpass">http://neostore.com/forgot_password</a>`
          };
          transporter.sendMail(mailOptions, (error, info)=>{
            if (error) {
                console.log(error)
                res.json({err:"Email error",status_code:200})
            } else {
              console.log('Email sent: ' + info.response);
              res.json({msg:"Email sent successfully for resetting the password",status_code:200})
            }
          })
})

router.post('/forgot/change/:email', (req, res)=>{
    let {email} = req.params;
    console.log(email);
    let {password} = req.body;
    const hash = bcrypt.hashSync(password, saltRounds);
    const userdata = userData(email);
    userdata.then(response=>{
            if(response.password == null){
                res.json({"err":"You don't have password to reset"});
            }
            else{
            if(response.email){
                userModel.updateOne({email:email},{$set:{password:hash}},(err)=>{
                    if(err){
                        res.json({err:err,status_code:400})
                    }
                    else{
                        res.json({msg:"Password updated successfully",status_code:200})
                    }
                })
            }
        }
    })
})

router.post('/social',(req,res)=>{
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let ins=new userModel({firstname:firstname,lastname:lastname,email:email})
    ins.save((err)=>{
        if(err){ return err;
    }
    else{
        res.json({"msg":"added suuccessfully",status_code:400})
    }
})
})
router.put('/editdata',validateUpd,authenticateToken,(req,res)=>{
    let email=req.body.email;
    editdata(email,req.body);
    const userdata = userData(email);
    userdata.then(response=>{
        res.json({"msg":"updated succesfully",userdata:response,status_code:200})
        })
})
// router.put('/updad',(req,res)=>{
//     let pincode=req.body.pincode;
//     updaddres(pincode,req.body);
//     res.json({msg:"updated address",adr:req.body})
// })
router.post('/changepassword',authenticateToken,(req,res)=>{
    let password=req.body.password;
    let old_password = req.body.old_password;
    let email = req.body.email
    userModel.findOne({email:email}, (err, info)=>{
        if(err) {
            res.json({err:"Fetch error",status_code:400})
            }
            else if(info===null){
                res.json({err:"User data not found",status_code:400})
            }
            else if(info.password == null){
                res.json({"err":"You don't have password to reset"});
            }
            else{
                if(bcrypt.compareSync(old_password, info.password)){
                    const hash = bcrypt.hashSync(password, saltRounds);
                    userModel.updateOne({email:email},{$set:{password:hash}},(err)=>{
                        if(err){
                            res.json({err:"Update error",status_code:400})
                        }
                        else{
                            res.json({msg:"Updated successfully",status_code:200})
                        }
                    })
                }
                else{
                    res.json({err:"Correctly enter the old password",status_code:400})
                }
            }
        })

})
router.post('/addaddress/:email',validateAddress,authenticateToken,(req,res)=>{
    let email=req.params.email;
    let address=req.body.address_line;
    let pincode=req.body.pincode;
    let city=req.body.city;
    let state=req.body.state;
    let country=req.body.country;
    let data={address:address,pincode:pincode,city:city,state:state,country:country}
    const add=adddata(data,email);
    const userdata = userData(email);    
    userdata.then(response=>{
    res.json({"msg":"Address added succesfully",userdata:response,status_code:200})
    })
})

router.put('/updaddress/:email',validateAddress,authenticateToken,(req, res)=>{
    let email = req.params.email;
    let address=req.body.address_line;
    let pincode=req.body.pincode;
    let city=req.body.city;
    let state=req.body.state;
    let country=req.body.country;
     userModel.updateOne({email:email,'address.pincode':pincode}
    ,{'$set':{
        'address.$.address_line':address,
        'address.$.city':city,
        'address.$.state':state,
        'address.$.country':country
    }}
,(err)=>{
        if(err){
            console.log(err);
            res.json({err:"Update error",status_code:400})
        }
        else{
            const userdata = userData(email);
    userdata.then(response=>{
    res.json({"msg":"updated succesfully",userdata:response,status_code:400})
    })
        }
    })
})

router.get('/getProducts',(req, res)=>{
    const product_data = getProducts();
    product_data.then(response=>{
        res.json({response:response,status_code:200});
    })
})


router.post('/deleteaddress/:email',authenticateToken, (req, res)=>{
    let email = req.params.email;
    let pincode=req.body.pincode;
    userModel.updateOne({email:email}, { "$pull": { "address": { "pincode": pincode } }},(err)=>{
        if(err){
            console.log(err);
            res.json({err:"Delete error",status_code:400})
        }
        else{
            const userdata = userData(email);
    userdata.then(response=>{
    res.json({"msg":"Deleted succesfully",userdata:response,status_code:400})
    })
        }
    })
})

router.get('/getdata',(req,res)=>{
    productModel.find({}).populate(['category_id', 'color_id']).then(response=>{
        res.json({products:response,status_code:200});
    })
})

router.get('/categories', (req, res)=>{
    const categories = getAllCategories();
    categories.then(response=>{
        res.json({categories:response,status_code:200});
    })
})

router.get('/colors', (req, res)=>{
    const colors = getAllColors();
    colors.then(response=>{
        res.json({colors:response,status_code:200});
    })
})

router.get('/categoryproducts/:id', (req, res)=>{
    let id = req.params.id;
    const products = getCategoryProducts(id);
    products.then(response=>{
        res.json({products:response,status_code:200});
    })
})

router.get('/colorproducts/:id', (req, res)=>{
    let id = req.params.id;
    const products = getColorProducts(id);
    products.then(response=>{
        res.json({products:response,status_code:200});
    })
})

router.post('/addcart',authenticateToken,(req, res)=>{
    let {id, email} = req.body;
    const order_data = getOrderById(id, email);
    order_data.then(response=>{
        if(response){
            res.json({err:"Product already added to cart",status_code:400})
        }
        else{
            let order_ins = new orderModel({email:email, product_id:id})
            order_ins.save((err)=>{
                if(err){
                    console.log(err);
                    res.json({err:err,status_code:400});
                }
                else{
                    res.json({msg:"Product added to cart successfully",status_code:200});
                }
            })
            
        }
    })

})

router.get('/getcart/:email',authenticateToken,(req, res)=>{
    let {email} = req.params;
    const cart_data = getCart(email);
    cart_data.then(response=>{
        if(response){
            res.json({cart:response,status_code:200});            
        }
        else{
            res.json({err:"No products ordered",status_code:400})
        }
    })
})

router.put('/incquantity',authenticateToken,(req, res)=>{
    let {email, product_id} = req.body;
    orderModel.updateOne({email:email, product_id:product_id,checkout:false},{$inc:{quantity:1}},(err)=>{
        if(err){
            res.json({err:err,status_code:400})
        }
        else{
            res.json({msg:"Incremented successfully",status_code:200});
        }
    })
})
router.put('/decquantity',authenticateToken,(req, res)=>{
    let {email, product_id} = req.body;
    const order_data = getOrderById(product_id, email);
    order_data.then(response=>{
        if(response.quantity === 1){
            res.json({err:'Product cannot be decremented',status_code:400});
        }
        else{
    orderModel.updateOne({email:email, product_id:product_id,checkout:false},{$inc:{quantity:-1}},(err)=>{
        if(err){
            res.json({err:err,status_code:400})
        }
        else{
            res.json({msg:"Decremented successfully",status_code:200});
        }
    })
}
    })
})

router.delete('/deleteorder/:id',authenticateToken,(req, res)=>{
    let {id} = req.params;
    orderModel.deleteOne({_id:id},(err)=>{
        if(err){
            res.json({err:"Delete error",status_code:400});
        }
        else{
            res.json({msg:"Cart Item deleted successfully",status_code:200});
        }
    })
})

router.get("/getproduct/:id", (req, res) => {
    let id = req.params.id
    productModel.findOne({ _id: id })
        .populate("color_id")
        .then(product => {
            res.json({ product: product, image: product.product_subimages ,status_code:200})
         
        })

})
router.post('/addrate/:id',authenticateToken,(req,res)=>{
    let id=req.params.id;
    let rate=req.body.rate;
    productModel.updateOne({_id:id},{$set:{product_rating:rate}},(err)=>{
        if(err){
            console.log(err);
            res.json({err:"Update error",status_code:400})
        }
        else{
            res.json({msg:"Update successfull",status_code:200})
        }
    })
})
router.post('/uploadlogo/:email',authenticateToken,(req,res)=>{
    let upload=multer({storage:storage,fileFilter:helpers.imageFilter}).single('myfile');
    upload(req,res,(err)=>{
        if(req.fileValidationError){
            res.json({err:req.fileValidationError,status_code:400});
        }
        else if(!req.file){
            res.json({err:"Please select a file",status_code:400});
        }
        else if(err){
            res.json({err:"Some file uploading error",status_code:400});
        }
        let email=req.params.email;
        let logo=req.file.filename;
        userModel.updateOne({email:email},{$set:{profile_img:logo}},(err)=>{
            if(err){
                res.json({err:"Update Error",status_code:400});
            }
            else{
                const userdata = userData(email);    
                userdata.then(response=>{
                    console.log(response);
                res.json({"msg":"Profile image uploaded succesfully",userdata:response,status_code:200})
                })
            }
        });
    })  
})

router.put('/checkout',authenticateToken, (req, res)=>{
    let {email, address} = req.body;
    orderModel.updateMany({email:email, checkout:false},{$set:{checkout:true,address:address}}, (err)=>{
        if(err){
            res.json({err:err,status_code:400})
        }
        else{
            res.json({msg:"Order placed successfully",status_code:200});
        }
    })
})
router.get('/getorder/:email',authenticateToken,(req, res)=>{
    let {email} = req.params;
    const order_data = getOrder(email);
    order_data.then(response=>{
        if(response){
            res.json({order:response,status_code:200});            
        }
        else{
            res.json({err:"No products ordered",status_code:200})
        }
    })
})
router.get('/getorderbyid/:id',(req, res)=>{
    let {id} = req.params;
    const order_data = getOrd(id);
    order_data.then(response=>{
        if(response){
            res.json({order:response,status_code:200});            
        }
        else{
            res.json({err:"No products found",status_code:200})
        }
    })
})
// router.get("/", (req, res)=>{
//     // productModel.find({}, (err, data)=>{
//     //     console.log(data);
//     //     res.send(data);
//     // })
//     productModel.find()
//     .populate('category_id')
//     .then(response=>{
//         res.send('Data fetch');
//         console.log(response);
//     })
// })
module.exports = router;
