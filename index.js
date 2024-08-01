const express = require('express')
const app = express()
//require('./db')

const cors = require('cors')
const corsOptions = {
  origin:"*",
  credentials:true,
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const {initializeDatabase} = require("./db")
const fs = require('fs')
const Event = require('./models/event.models')

app.use(express.json())

 initializeDatabase();
const jsonData = fs.readFileSync("events.json","utf8")

const eventsData = JSON.parse(jsonData)


app.get("/", (req,res)=>{
  res.send("Hello Express!")
})

function seedData() {
  try {
    for (const eventData of eventsData) {
      const newEvent = new Event({
        title: eventData.title,
          eventDate: eventData.eventDate,
          eventType: eventData.eventType,
          eventDay: eventData.eventDay,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          speakers: eventData.speakers,
          host: eventData.host,
        details:eventData.details,
          eventImageUrl: eventData.eventImageUrl,
        eventTags:eventData.eventTags,
        pricing: eventData.pricing,
        address:eventData.address,
        dressCode:eventData.dressCode,
        ageRestriction:eventData.ageRestriction
      });
      newEvent.save();
      console.log("new event", newEvent.title);
    }
  } catch (error) {
    console.log("error seeding the data", error);
  }
}

//seedData();



async function addEvent(newEvent){
  try{
    const event = new Event(newEvent)
    const saveEvent = await event.save()
    return saveEvent
  } catch(error){
    console.log('error saving event data:', error)
  }
}
//addEvent()
app.post("/events", async(req,res)=>{
  try{
   const savedEvent = await addEvent(req.body) 
    res.status(201).json({message:"event added successfully.", event:savedEvent})
  } catch(error){
    res.status(500).json({error:"failed to add event."})
  }
})

async function findAllEvents() {
  try {
    const allEvents = await Event.find()
    return allEvents
  } catch (error) {
    console.error('Error fetching all events:', error)
  }
}

//findAllEvents()
app.get("/events", async (req,res)=>{
  try{
    const events = await findAllEvents()
    if(events.length != 0){
      res.json(events)
    } else {
      res.status(404).json({error: "No events found."})
    }
  } catch(error){
    res.status(500).json({error:"Failed to fetch events."})
  }
})


//find an event with a title
async function readEventByTitle(eventTitle){
  try{
    const event = await Event.findOne({title: eventTitle})
    return event
  } catch(error){
    throw error
  }
}

app.get("/events/:title", async (req,res)=>{
 try{
   const event = await readEventByTitle(req.params.title)
   if(event){
     res.json(event)
   } else {
     res.status(404).json({error:"Event not found."})
   }
 }  catch(error){
   res.status(500).json({error:"failed to fetch an event."})
 }
})

//get event by tagname
async function readByTag(tagName){
  try{
    const eventByTag = await Event.find({eventTags: tagName})
    return eventByTag
  } catch(error){
    console.log(error)
  }
}
app.get("/events/eventTags/:tagName", async(req,res)=>{
  try{
    const events = await readByTag(req.params.tagName)
    
    if(events.length != 0){
      res.json(events)
    } else {
      res.status(404).json({error:"No events found."})
    }
  } catch(error){
    res.status(500).json({error:"failed to fetch an event"})
  }
})

//deleting an event
async function deleteEvent(eventId){
  try{
    const deletedEvent = await Event.findByIdAndDelete(eventId)
    return deletedEvent
  } catch(error){
    console.log(error)
  }
}
app.delete("/events/:eventId", async(req,res)=>{
  try{
    const deleteMovie = await deleteEvent(req.params.eventId)
    if(deleteMovie){
      res.status(200).json({message:"Event deleted successfully."})
    }
  } catch(error){
    res.status(500).json({error:"failed to delete an event."})
  }
})

//update events
async function updateEvent(eventId, dataToUpdate){
  try{
   const updatedEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, {
     new:true}) 
    return updatedEvent
  } catch(error){
    console.log("error in updating event", error)
  }
}

app.post("/events/:eventId", async(req,res)=>{
  try{
    const updatedEvent = await updateEvent(req.params.eventId, req.body)
if(updatedEvent){
  res.status(200).json({message:"event updated successfully."})
} else {
  res.status(404).json({error:"event not found."})
}
    
  } catch(error){
    res.status(500).json({error: "failed to update an event"})
  }
})

const PORT = 3000
app.listen(PORT,()=>{
  console.log(`server is running in port ${PORT}`)
})