import {app} from './server'
import mongoose from 'mongoose'
import {Request, Response, NextFunction} from 'express'
require("dotenv").config();

const URL = process.env.URL!
const PORT = process.env.PORT || 3000


mongoose.connect(URL)
    .then(data => console.log('we connected'))
    .catch(e => console.log(e))


app.use(function(err:any, req: Request ,res: Response ,next:NextFunction){
    console.log(err.message)
    return res.status(err.statusCode || 500).send(err.message)
})

app.listen(PORT, () => console.log('we listening!!'))