import {app} from './server'
import mongoose from 'mongoose'
import {Request, Response, NextFunction} from 'express'
import { createServer }  from "http";
import { Server } from "socket.io";
import chat from './chat/chat.index'
import {enviroment} from './Environment/environment.pro'
require("dotenv").config();

const URL = process.env.URL!
const PORT = process.env.PORT || 3000


mongoose.connect(URL)
    .then(data => console.log('we connected'))
    .catch(e => console.log(e))

const httpServer = createServer(app);

export const io = new Server(httpServer, {
    cors: {
        origin: enviroment.url
    }
});

chat()



app.use(function(err:any, req: Request ,res: Response ,next:NextFunction){
    console.log(err.message)
    return res.status(err.statusCode || 500).send(err.message)
})


httpServer.listen(PORT, () => console.log('we listening!!'))