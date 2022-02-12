import {Request, Response, NextFunction} from 'express'
import { IRegister } from './interface'
import joi from 'joi'
import userSchema from './regUsers.model'
import jwt from 'jsonwebtoken'
require("dotenv").config();
import bcrypt from "bcryptjs";


export class RegController{
    Port = process.env.PORT || 'localhost:3000'
    secret = process.env.SECRET!
    constructor(){
        this.main = this.main.bind(this)
    }

   async main(req:Request, res:Response,  next:NextFunction){
        let data = {...req.body}

        //this is just for a demo purpose
        if(data.status === 'health'){
            this.forDemo(data)
        }
        //the demo ends here 
        let num = await this.getAllUsersdb()
        data.uniqueNum = num.length + 1
        let validData = this.validCredentials(data)
        if(validData.error){
            const msg = validData.error.details[0].message
            let err = this.errorfunc(msg, 300)
            return next(err)
        }

        try {
            this.hashPassword(data)
            let user = await this.insertIntoDb(data)
            if(user){
                return res.status(201).send({msg: 'user created', user})
            }
        } catch (error) {
            next(error)
        }
       

    }

    async insertIntoDb(data:IRegister){
        try {
            let user = new userSchema(data)
            let savedUser = await user.save()
            let token = jwt.sign({ id: savedUser._id }, this.secret);
            return {
                token,
                status: user.status,
                num:user.uniqueNum,
                lastname: user.lastname,
                firstname: user.firstname,
                pic:user.pic ? user.pic : ''
            }
        } catch (error) {
            throw(error)
        }
    }

    validCredentials(data: IRegister){
        const schema = joi.object({
            email: joi.string().required().email(),
            password: joi.string().min(6).required(),
            firstname: joi.string().required(),
            lastname:joi.string().required(),
            status:joi.string(),
            pic:joi.string(),
            uniqueNum:joi.number(),
            profession: joi.string()

        })
        const ops = {
            errors: {
                wrap: {
                    label: ''
                }
            }
        }

        let validatedData =  schema.validate(data, ops)
        return validatedData
    }


    errorfunc(msg: string, code:number){
        let err:any = new Error(msg)
        err.statusCode = code
        return err
    }

    hashPassword(data:IRegister){
        data.password = bcrypt.hashSync(data.password, 8);
    }



    async getAllHealth(req:Request, res:Response, next:NextFunction){
        let users = await userSchema.find({
            status: 'health'
        })

        return res.status(200).send({users})

    }
   async  getAllUsers(req:Request, res:Response, next:NextFunction){
        try {
            
        } catch (error) {
                next(error)
        }
    }

    async getAllUsersdb(){
        try {
        let users = await userSchema.find()
        return users
        } catch (error) {
                throw(error)
        }


    }



    async UpdateUser(req:Request, res:Response, next:NextFunction){
        let id = req.query.id
        let data = req.body
        const url = process.env.PORT || 'http://localhost:3000'

        if(req.file){
            req.body.pic = `${url}/${req.file?.path}`
        }
        if(data.password){
          data.password = bcrypt.hashSync(data.password, 8)
        }
        const filter = {uniqueNum:id}
    
        try {
          let updated = await userSchema.findOneAndUpdate(filter, data, {
               new: true
           })
           return res.status(200).send({message: 'updated successfully'})
    
       } catch (error) {
               next(error)
       }
    }

    async getSingleUser(req:Request, res:Response, next:NextFunction){
        try {
            let loginUser = await userSchema.findOne({
                uniqueNum: req.query.id
            })

            return res.status(200).send({user:loginUser})
        } catch (error) {
                next(error)
        }
        let loginUser = await userSchema.findOne({
            _id: req.query.id
        })
    }


    forDemo(data:any){
        switch(data.firstname){
            case 'Doc1':
                data.pic = 'assets/imgs/doc1.jpg';
                break;
            case 'Doc2':
                data.pic = 'assets/imgs/doc2.jpg';
                break;
            case 'Doc3':
                data.pic = 'assets/imgs/doc3.jpg';
                break;
            case 'Doc4':
                data.pic = 'assets/imgs/doc4.jpg';
                break;
            case 'Nurse1':
                data.pic = 'assets/imgs/nurse1.jpg';
                break;
            case 'Nurse2':
                data.pic = 'assets/imgs/nurse2.jpg';
                break;
            case 'Nurse3':
                data.pic = 'assets/imgs/nurse3.jpg';
                break;
            case 'Mid1':
                data.pic = 'assets/imgs/midwife.jpg';
                break;
        }
    }

    



}