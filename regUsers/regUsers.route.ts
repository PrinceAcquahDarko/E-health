import express from 'express'
const regrouter = express.Router();
import {RegController} from './regUsers.controller'
let regcon = new RegController()
import {Utiliy} from '../utility/utility'

let util = new Utiliy()
const upload = util.fileUpload()
function Regroute(){
    regrouter.route('/')
        .post(upload.single('pic'), regcon.main)
    return regrouter
}

export default Regroute()