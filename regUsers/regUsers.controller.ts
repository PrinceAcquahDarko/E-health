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
        // req.body.pic = `${this.Port}/${req.file?.path}`
        const data = {...req.body}
        
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
                firstname: user.firstname
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

    



}