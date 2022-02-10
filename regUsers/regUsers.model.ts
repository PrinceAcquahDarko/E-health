import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        firstname:{
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },
        lastname:{
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        status: {
            type: String,
            required: true,
            enum: ['user', 'health'],
            default: 'user'
          },
          password: {
            type: String,
            required: true
          },
          work: {
            type: String,
          
          },
          profession: {
            type: String,
          
          },
          description: {
            type: String,
          
          },
          pic: {
              type:String
            },
            uniqueNum: {
              type:Number,
              required:true
            },
    }
)



export default mongoose.model('Euser', UserSchema)