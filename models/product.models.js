const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  nameAndFeature:[{
    type:String
  }],
  rating:{
    type:Number
  },
  numberOfRatings:{
    type:Number
  },
  numberOfReviews:{
    type:Number
  },
  price:{
    type:Number
  },
  percentageOff:{
    type:String
  },
  offers:[{
    type:String
  }],
  warranty:{
    type:String
  },
  variants:[{
    type:String
  }],
  wifi:{
    type:String
  },
  imageUrl:{
    type:String
  },
  addtoCart:{
    type:String
  },
  buynow:{
    type:String
  }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product