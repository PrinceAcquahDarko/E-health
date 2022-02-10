import mongoose from 'mongoose'

const TempNotiSchema = new mongoose.Schema({
    to:{
        type:Number,
        required:true
    },
    from:{
        type:Number,
        required:true
    },
   
})


export default mongoose.model('tempNoti', TempNotiSchema)
