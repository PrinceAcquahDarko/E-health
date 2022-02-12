import {io} from '../app'
require("dotenv").config();
import {ChatController} from './chat.controller'



const secret = process.env.SECRET!
let ch = new ChatController()

function chat(){
    io.use((socket:any,  next) => {
        const userId = socket.handshake.auth.userId
        
        if(userId){
            socket.userID = userId
            return next()
        }
      })


    io.on("connection", async (socket:any) => {
    
        socket.join(socket.userID)
        const users = [];

        for (let [id, socket] of io.of("/").sockets) {
          users.push({
            userID: id,
            id: socket.handshake.auth.userId
          });
        }
        socket.emit("users", users);
        // ...
        let tempChat = await ch.getSaveTempChats(socket.userID)

        if(tempChat.length){
          tempChat.forEach(chat => {
               socket.emit("savedChats", chat);
          })
          await ch.deleteTempChat(socket.userID)

        }

        let tempNoti = await ch.getTempNoti(socket.userID)
        if(tempNoti.length){
          tempNoti.forEach(chat => {
               socket.emit("savedNoti", chat);
          })
          await ch.deleteTempNoti(socket.userID)

        }
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            id: socket.handshake.auth.userId
          });


    
        socket.on("request message", async (data:any) => {
      
          let notifi = {
            to:data.to,
            from:data.from,
            day: data.day,
            msg: 'you have a new chat request'
          }
          await ch.notification(notifi)


          if(data.connection){
            socket.to(data.to).emit("request message", {
              content: data.content,
              from: socket.userID,
            });
          }else{
            await ch.Tempnotification(notifi)
          }
        
        });

       
        socket.on("confirm message", async (data:any) => {
          let noti = {
            to:data.to,
            from:data.from,
            day:data.day,
            msg: 'Your chat request has been accepted'
          }
          await ch.notification(noti)


          let from = data.to    //since we wanna store in the db the 'to' becomes the 'from' as in the confirm msg is been sent from the doctor to the user so in the db the user becomes the from
          let to = data.from

          let body = {
            to,
            from,
            subs:true
          }
         let sub = await ch.saveSubs(to, from, body)
   
          if(data.connection){
            socket.to(data.to).emit("confirm message", {
              content: data.content,
              from: socket.userID,
              sub
            });
          }else{
            await ch.Tempnotification(noti)
          }
          

        });

       

        socket.on("private message", async(data:any) => {
          let content = {
            content: data.content,
            from: socket.userID,
            to:data.to,
            textSort: socket.userID,
            day: data.day
          }
          if(data.health){
            content.from = data.to
            content.to = socket.userID
          }
          await ch.saveChats(content)
          if(data.connection){
            socket.to(data.to).emit("private message", {
              content: data.content,
              from: socket.userID,
            });
          }else{
            let obj={
              to:data.to,
              from:socket.userID,
              content: data.content
            }
            let res = await ch.saveTempChats(obj)
          }
      
        });
    
   

          socket.on("disconnect", async () => {
                const matchingSockets = await io.in(socket.userID).allSockets();
                 const isDisconnected = matchingSockets.size === 0;
                  if (isDisconnected) {
                    socket.broadcast.emit("user disconnected", socket.userID);
                
    }
  });
      });
}

export default chat
