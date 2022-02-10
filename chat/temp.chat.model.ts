import mongoose from 'mongoose'

const TempChatSchema = new mongoose.Schema({
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
    }
})


export default mongoose.model('TempChat', TempChatSchema)
