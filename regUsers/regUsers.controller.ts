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
       console.log(req.body)
        let data = {...req.body}
        data.status = 'health'
        data.pic = 'assets/imgs/nurse3.jpg'
        // data.status = 'health'
        let num = await this.getAllUsersdb()
        data.uniqueNum = num.length + 1
        console.log(data.uniqueNum, 'from unitq')
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
                num:user.uniqueNum
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
            uniqueNum:joi.number()

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

    



}