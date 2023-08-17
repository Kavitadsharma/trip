const mongoose=require("mongoose")
const trip=mongoose.Schema({
    name:String,
    email:String,
    destination:String,
    travelers:Number,
    budget:Number

})

const TravelModel=mongoose.model("trip",trip)


module.exports={TravelModel}