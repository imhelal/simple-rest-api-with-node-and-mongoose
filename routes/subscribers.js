const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


//Getting All
router.get('/', async (req,res)=>{
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})
//Getting One
router.get('/:id',getSubscriber,(req,res)=>{
    res.send(res.subscriber.name)
})
//Creating One
router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedTochannel: req.body.subscribedTochannel
    })

    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}) 
//Updating One
router.patch('/:id',getSubscriber,async(req,res)=>{
    if(req.body.subscribedTochannel!=null){
      res.subscriber.subscribedTochannel = req.body.subscribedTochannel

    }
    if(req.body.name!=null){
        res.subscriber.name = req.body.name
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
//Deleting One
router.delete('/:id',getSubscriber, async(req,res)=>{
    try {
        await res.subscriber.remove()
        res.status(500).json({message:"Subscriber Deleted!"})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})
//Subscriber Model
async function getSubscriber(req,res,next){
    let subscriber

    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message:"Cannot Find Subscriber"})
        }

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
res.subscriber = subscriber
    
next()
}




module.exports = router