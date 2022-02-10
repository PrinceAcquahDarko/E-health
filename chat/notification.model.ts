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
 
   
})


export default mongoose.model('Notification', NotificationSchema)
