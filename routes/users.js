 const express = require('express')
const { restart } = require('nodemon')
 const Users   = require('../models/user')
 const router = express.Router()

 //Getting Users
 router.get('/',async (req,res)=>{
     try {
         const allUser = await Users.find()
         res.status(200).json(allUser)
     } catch (error) {
         res.status(400).json({message:error})
     }
 })

//Getting User
router.get('/:id',getUser,(req,res)=>{
    res.send(res.user)
})

//Creating User
router.post('/', async(req,res)=>{
    const user = new Users({
        name:req.body.name,
        email:req.body.email
    })
    try {
        const newUser = await user.save()
        res.status(200).json({message:"New User Created!",user:newUser})
    } catch (error) {
        res.status(500).json({message:error})
    }
})

//Updating User
router.patch('/:id',getUser, async(req,res)=>{
    const newName = req.body.name
    const newEmail= req.body.email

    if(newName != null){
        res.user.name = newName
    }
    if(newEmail != null){
        res.user.email = newEmail
    }

    try{
        const updatedUser = await res.user.save()
        res.status(200).json({message:"User Updated"});
    }
    catch(err){
        res.status(500).json({message:err})
    }
})

//Deleting the user
router.delete('/:id',getUser, async(req,res)=>{
    try {
        await res.user.remove()
        res.status(200).json({message:"User Deleted!"})
    } catch (err) {
        res.status(500).json({message:err})
    }
})


//User Middleware
async function getUser(req,res,next){
    let user;
    try {
        user = await Users.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message:"Cannot Find the User"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
    res.user = user
    next()
}


 module.exports = router