import {Request, Response, NextFunction} from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
require("dotenv").config();


export class Utiliy{
    secret = process.env.SECRET!
    constructor(){this.fileUpload = this.fileUpload.bind(this); this.getLoggedInUser = this.getLoggedInUser.bind(this)}


    getLoggedInUser(req:Request, res:Response, next:NextFunction){
        if(!req.header('Authorization')){
            let e = this.errorfunc('no user logged in', 400)
            return next(e)
        }
        

        let token = req.header('Authorization')!.split(' ')[1]
         jwt.verify(token, this.secret, ((err: any, decoded: any) =>{
        if(decoded)
            req.query.UserId = decoded.id
    }) )
    
    next()
    }

    fileUpload(){
        let storage = this.storage()
        let fileFilter = this.fillterby()
        const upload = multer({storage, limits: {
                fileSize: 1024*1024 * 5,
            },
            fileFilter
            })


        return upload
    }

    storage(){
        const storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, 'uploads/')
            },
            filename: function(req, file, cb){
                cb(null, new Date() .toISOString().replace(/:/g, '-') + file.originalname)
            }
        })

        return storage
    }

    fillterby(){
        const fileFilter = (req: any, file: any, cb: any) => {
            if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
                cb(null, true)
            }else{
                //we throw new Error(" here");
                cb(new Error('unsupported format'), false)
            }
    }

    return fileFilter
    }

    errorfunc(msg: string, code:number){
        let err:any = new Error(msg)
        err.statusCode = code
        return err
    }
}