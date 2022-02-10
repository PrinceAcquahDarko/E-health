import mongoose from 'mongoose'
const {Schema} = mongoose

const SubsSchema = new Schema({
    to:{
        type:Number,
        required:true
    },
    from:{
        type:Number,
        required:true
    },
    subs:{
        type:Boolean,
        required:true
    },
    fromUser:{
        type:Schema.Types.ObjectId, ref: 'Euser', required:true
    },
    toUser:{
        type:Schema.Types.ObjectId, ref: 'Euser', required:true

    }
   
})


export default mongoose.model('Subs', SubsSchema)
