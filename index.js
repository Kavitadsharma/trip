const express=require("express")
const mongoose=require("mongoose")

const cors=require("cors")
const { connection } = require("./db")
const {TravelModel}=require("./model")
require("dotenv").config()
const app=express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
res.send("home page")
})
//post

app.post('/travel',async(req,res)=>{
    const {name,email,destination,travelers,budget}=req.body
   // console.log(req.body)
    try{
        const travel= new TravelModel({name,email,destination,travelers,budget})
        //console.log(name)
        await travel.save()
        res.send(travel)
        console.log("travel added")
    }catch(error){
        res.send(error)
    }
})
app.get("/travel",async(req,res)=>{
    try{
        const travel= await TravelModel.find()
        res.send(travel)
    }catch(error){
        res.send(error)
    }
   
})
app.delete("/travel/:id",async(req,res)=>{
    const id=req.params.id

    try{
        const deletedTravel=await TravelModel.findByIdAndDelete({_id:id})
        
        res.send("deleted travel")

    }catch(error){
        res.send(error)
    }
})


app.get("/sortbudgetbyDesc",async(req,res)=>{
    try{
        const travel=await TravelModel.find().sort({budget:-1})
        res.send(travel)
    }catch(error){
        res.send(error)
    }
})
app.get("/sortbudgetbyAesc",async(req,res)=>{
    try{
        const travel=await TravelModel.find().sort({budget:1})
        res.send(travel)
    }catch(error){
        res.send(error)
    }
})
app.get("/travel/filter/:destination",async(req,res)=>{
    const destination=req.params.destination
    try{
        const travel=await TravelModel.find({destination:destination})
        res.send(travel)
    }catch(error){
        res.send(error)
    }
})


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    
      
    }catch(err){
        console.log("error in db connection")
    }
    console.log("server is working")


})