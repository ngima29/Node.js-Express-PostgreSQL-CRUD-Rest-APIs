const bcrypt = require('bcrypt');
const db = require('../config/dbconnection');
const userModel = db.user;
//const Token = db.Token;
const jwt = require('jsonwebtoken');
const { createToken , verifyToken} = require('../helper');
require("dotenv").config();
const sendEmail = require('../helper/sendEmail');


const registerUser = async (req,res)=>{
    const {name, email, password,address}= req.body
    console.log(name, email, password,address)
    try {
        const user = await userModel.findOne({
            where: { email: email }
        });
        if(user){
                res.status(400).send({success:false,msg:"email already exits "});
          }else{
            const hashpassword = await bcrypt.hash(password,10);
            const doc = await userModel.create({
                   name:name,
                   email:email,
                   password:hashpassword,
                   address:address
                   });
                   const Token = await createToken(doc);
            if(Token){
                const c_url = `${process.env.CLIENT_URL}/emailconfirmation?token=${1234}`;
            await sendEmail({
                    from:process.env.SMTP_USER,
                    to:doc.email,
                    subject:"email varification link",
                    text: `hello ${doc.name} click below to verify your email`,
                    html:`<a href='${c_url}'> verify email </a>`
                    })
                    //console.log('email calling')
                 if(sendEmail){
                
                res.status(201).send({success:true,msg:"successfully register please verify your email",token:Token}) ;
            }else{
                res.status(400).send({success:false,msg:"something went wrong !! "})   
            }
        } 
    }     
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}

// get all user 
const getUser = async (req,res)=>{
    try {
        const user = await userModel.findAll({});
        res.status(200).send({success:true, data:user}) ;   
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}

// get user by ID
const getUserById = async (req,res)=>{
    console.log( req.params.id)
   try {
       const id = parseInt(req.params.id);
       const user = await userModel.findByPk(id);
        res.status(200).send({success:true, data:user});
   } catch (error) {
       res.status(400).send({success:false,msg:"something went wrong !! "});
       console.log(error);
   }
}



// upadte user by id
const updateUserById = async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const result = await userModel.update(req.body, {where: { id: id } });
        const user = await userModel.findByPk(id);
        res.status(200).send({success:true,msg:"updated successfully", data:user});   
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "});
        console.log(error);
    }
}


/// delete user
const deleteUserById = async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        console.log(id)
        const result = await userModel.destroy({where: { id:id}})
        res.status(200).send({success:true,msg:"successfully deleted !! "});
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "});
        console.log(error);
    }
}

/// user login 
const login = async(req,res)=>{
        const { email, password}= req.body
    try {
        const user = await userModel.findOne({ where: { email: email}});
        if(user){
            const isMatch =await bcrypt.compare(password,user.password)
            if(user.email === email && isMatch){
                const token = await createToken(user);
                res.status(200).send({success:true,msg:"your are login ",token: token});

            }else{ res.status(201).send({success:false,msg:"email or password does not match"}) ;}
        }else{
              res.status(201).send({success:false,msg:"email or password does not match"}) ;
        } 
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "});
        console.log(error);
    }
}

const emailVerify = async(req, res) =>{
try {
    //console.log( req.params.token)
       const verifiedToken =  verifyToken(req.params.token);
       console.log(verifiedToken.id);
       const id = verifiedToken.id;
       const user = await userModel.findByPk(id);
    // check if the user is already verified
    if(user.isVerifyEmail){
        res.status(400).send({success:false,msg:"this email is already varefied "});
    }
    /// save the varified user
     await user.update({where: {id} },{isVerifyEmail: true}).then(() => {
        console.log(`Updated field with id ${id}`);
      });
      res.status(400).send({success:true,msg:" email is  varefied  "});
} catch (error) {
    res.status(400).send({success:false,msg:"something went wrong !! "});
        console.log(error);
}
}

module.exports ={
    registerUser,getUser,getUserById,updateUserById,deleteUserById,login,emailVerify
}