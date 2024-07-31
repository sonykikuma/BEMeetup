const mongoose = require('mongoose')

const eventsSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  eventDate:{
    type:Date,
    required:true
  },
  eventType:[{
    type:String,
    required:true,
    enum:["Both","Online","Offline"],
  }],
  eventDay:{
    type:String,
    required:true
  },
  startTime:{
    type:String,
    required:true
  },
  endTime:{
    type:String,
    required:true
  },

  speakers:[{
    type:String,
    
  }],
  host:{
    type:String,
    required:true
  },
  details:{
    type:String,
    required:true
  },
  eventImageUrl:{
    type:String
  },
  eventTags:[{
    type:String
  }],
  pricing:{
    type:Number,
    required:true
  },
  address:{
    type:String,
  },
  dressCode:{
    type:String
  },
  ageRestriction:{
    type:String,  
  }
},{timestamps:true})

const Events = mongoose.model("Events",eventsSchema)
module.exports = Events