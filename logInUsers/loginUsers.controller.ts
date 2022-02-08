import {Request, Response, NextFunction} from 'express'
import joi from 'joi'
import { Ilogin } from './loginInterface';
import UserSchema from '../regUsers/regUsers.model'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config()

export class loginController{
    secret = process.env.SECRET!
    constructor(){this.mainLogin = this.mainLogin.bind(this); this.generateToken = this.generateToken.bind(this)}

    async mainLogin(req: Request, res: Response, next: NextFunction){
        let data = {...req.body}

        let validData = this.validateData(data);
        if(validData.error){
            const msg = validData.error.details[0].message
            let err = this.errorfunc(msg, 300)
            return next(err)
        }

        try {
            let user = await this.getUserFromDb(data)
            if(!user){
                let err = this.errorfunc('no such user', 400)
                return next(err)
            }
            let validPassword = await this.comparePassword(data, user)
            if(!validPassword){
                let err = this.errorfunc('passwords dont much', 300)
                return next(err)
            }
            // let token = jwt.sign({ id: user._id }, this.secret);
            let token = this.generateToken(user._id)
            let response = {
                token,
                status: user.status,
                firstname: user.firstname
              }

              return res.status(200).send({msg: 'succesful', response})

        } catch (error) {
            next(error)
        }
    }

    generateToken(userID: string){
        let token = jwt.sign({ id: userID }, this.secret);
        return token

    }

    validateData(data: Ilogin){
        const schema = joi.object({
            email: joi.string().required().email(),
            password: joi.string().min(6).required()
         
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

    async getUserFromDb(data:Ilogin){
        try {
            let loginUser = await UserSchema.findOne({
                email: data.email
            })
            return loginUser

        } catch (error) {
            throw(error)
        }
    
    }

    async comparePassword(data: Ilogin, loginUser:any){
        try {
            let validPassword = await bcrypt.compare(
                data.password,
                loginUser.password
              )
    
              return validPassword
        } catch (error) {
            throw(error)
        }
       
    }

    errorfunc(msg: string, code:number){
        let err:any = new Error(msg)
        err.statusCode = code
        return err
    }
}