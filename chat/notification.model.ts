import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema({
    to:{
        type:Number,
        required:true
    },
    from:{
        type:Number,
        required:true
    },
    day:{
        type:String,
        required: true,
    },
    msg:{
        type:String,
        required:true
    }
 
   
})


export default mongoose.model('Notification', NotificationSchema)
