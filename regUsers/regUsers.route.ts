import express from 'express'
const regrouter = express.Router();
import {RegController} from './regUsers.controller'
let regcon = new RegController()

function Regroute(){
    regrouter.route('/')
        .post(regcon.main)
    return regrouter
}

export default Regroute()