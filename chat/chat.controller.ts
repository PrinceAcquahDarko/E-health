import {Request, Response, NextFunction} from 'express'
import SubSchema from './subs.model'
import ChatSchema from './chat.model'
import regModel from '../regUsers/regUsers.model'
import tempChatModel from './temp.chat.model';
import notificationModel from './notification.model';
import TempNotiSchema  from './tempNoti.model'


export class ChatController{

    constructor(){
    }
    //all health workers you subscribed to
    async getAllHealth(req:Request, res:Response, next:NextFunction){
        try {
            let users;
            console.log(req.query.status)
            if(req.query.status ==='user'){
                 users = await SubSchema.find({
                    from: req.query.me,
                    subs: true
                }).populate('toUser').populate('fromUser')
            }else{
                    users = await SubSchema.find({
                    to: req.query.me,
                    subs: true
                }).populate('fromUser').populate( 'toUser')
            }
          
            return res.status(200).send({users})
        } catch (error) {
                next(error)
        }   
   

    }

    async getChats(req:Request, res:Response, next:NextFunction){
        try {
            console.log(req.query.me, 'from me') 
            console.log(req.query.to, 'from to')
            let users;
            if(req.query.status === 'user'){
             users = await ChatSchema.find({
                    from: req.query.me,
                    to: req.query.to
                })
            }else{
                users = await ChatSchema.find({
                    from: req.query.to,
                    to: req.query.me
                })
            }
           
            return res.status(200).send({users})
        } catch (error) {
                next(error)
        }   
   

    }

    async saveChats(data:any){
        try {
            let msg = new ChatSchema(data)
             let res =  await msg.save()
             return res
        } catch (error) {
                throw(error)
        }   
    }

    async saveTempChats(data:any){
        try {
            let msg = new tempChatModel(data)
             let res =  await msg.save()
             return res
        } catch (error) {
                throw(error)
        }   
    }

    async deleteTempChat(id:number){
        try {
            await tempChatModel.deleteMany({to:id})
        } catch (error) {
            throw(error)
        }
    }

    async deleteTempNoti(id:number){
        try {
            await TempNotiSchema.deleteMany({to:id})
        } catch (error) {
            throw(error)
        }
    }

    async notification(id:any){
        try {
            let notification = new notificationModel(id)
           let res = await notification.save()
           console.log(res)
          
        } catch (error) {
                throw(error)
        }   
    }


    async Tempnotification(id:any){
        try {
            let notification = new TempNotiSchema(id)
            await notification.save()
          
        } catch (error) {
                throw(error)
        }   
    }
    async getTempNoti(id:number){
        try {
          let  users = await TempNotiSchema.find({
                to: id
            })

            return users
        } catch (error) {
            throw(error)
        }
    }


    async getSaveTempChats(id:number){
        try {
          let  users = await tempChatModel.find({
                to: id
            })

            return users
        } catch (error) {
            throw(error)
        }
    }

    //find unique num and save
    async saveSubs(to:number, from:number, body:any){
        try {
            let fromUser = await regModel.findOne({
                uniqueNum: from
            })
            let toUser = await regModel.findOne({
                uniqueNum: to
            })
        body.fromUser = fromUser
        body.toUser = toUser
        let subs = new SubSchema(body)
          let saved =  await subs.save()
          console.log(saved)
          return saved

        } catch (error) {
            throw(error)
        }
    }
  



    



}