import mongoose from "mongoose";

const testSchema=new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
      customerName:{
        type:String,
        required:true
    },
      items:[
      {
        product:{
            type:String,
        },
        price:{
            type:Number
        },
        quantity:{
            type:Number
        }

      }
      ],
      orderDate:{
        type:String,
        required:true
    },
      status:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    location:{
        city:{
            type:String
        },
        pincode:{
            type:Number
        }
    }
})

const Test=mongoose.model("Test",testSchema);

export default Test;