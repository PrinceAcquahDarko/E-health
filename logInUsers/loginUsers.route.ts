import express from 'express'
const logrouter = express.Router();
import {loginController} from './loginUsers.controller'
let logCon = new loginController()

function Regroute(){
    logrouter.route('/')
        .post(logCon.mainLogin)
    return logrouter
}

export default Regroute()