import express from 'express'
const chatRouter = express.Router();
import {ChatController} from './chat.controller'
let logCon = new ChatController()

function ChatRoute(){
    chatRouter.route('/')
        .get(logCon.getAllHealth)
    chatRouter.route('/msgs')
        .get(logCon.getChats)
    return chatRouter
}

export default ChatRoute()