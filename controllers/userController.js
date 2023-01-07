const bcrypt = require('bcrypt');
const db = require('../config/dbconnection');
const userModel = db.user;

const registerUser = async (req,res)=>{
    const {name, email, password,address}= req.body
    console.log(name, email, password,address)
    try {
        const user = await userModel.findOne({
            where: { email: email }
        });
        if(user){
            console.log(user)
                res.status(400).send({success:false,msg:"email already exits "});
          }else{
            const hashpassword = await bcrypt.hash(password,10);
            const doc = await userModel.create({
                   name:name,
                   email:email,
                   password:hashpassword,
                   address:address
                   });
              res.status(201).send({success:true,msg:"successfully register", data:doc}) ;
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

module.exports ={
    registerUser,getUser,getUserById,updateUserById,deleteUserById
}