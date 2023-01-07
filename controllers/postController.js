 const db = require('../config/dbconnection');
 const postModel = db.post;

/// insert post
const insertPost = async (req,res)=>{
    const {title, body, image, userId}= req.body
   
    //console.log(title, post_body, image)
    try {
        const doc = await postModel.create({
            title:title,
            body:body,
            image:image,
            userId:userId
            });
       res.status(201).send({success:true,msg:"post successfully created ", data:doc}) ; 
       
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}

// get all post 
const getAllPost = async (req,res)=>{
    try {
        const post = await postModel.findAll({});
        res.status(200).send({success:true,data:post})
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}

// get post by id
const getPostById = async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const post = await postModel.findByPk(id);
        res.status(200).send({success:true,data:post})
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}
// update post by id 
const updatePost = async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const result = await postModel.update(req.body, {where: { id: id } });
        const post = await postModel.findByPk(id);
        res.status(200).send({success:true,msg:"updated successfully", data:post});
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}
// delete post by id
const deletePost = async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const result = await postModel.destroy({where: { id:id}})
        res.status(200).send({success:true,msg:"successfully deleted !! "});
    } catch (error) {
        res.status(400).send({success:false,msg:"something went wrong !! "})
        console.log(error);
    }
}

module.exports = {insertPost,getAllPost,getPostById,updatePost,deletePost};