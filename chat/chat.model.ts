import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    to:{
        type:Number,
        required:true
    },
    from:{
        type:Number,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    textSort:{
        type:Number,
        required:true
    },
    day:{
        type:Date,
        required: true,
        default:Date.now
    }
})


export default mongoose.model('Chat', ChatSchema)
