import {io} from '../app'


require("dotenv").config();

const secret = process.env.SECRET!
import {ChatController} from './chat.controller'
let ch = new ChatController()

function chat(){
    console.log('heyyyy')
    io.use((socket:any,  next) => {
        let count = Math.random() * 10
        const userId = socket.handshake.auth.userId
        
        if(userId){
            socket.userID = userId
            // socket.connection = true
            return next()
        }
        socket.userID =  count;
        count += 1
        next()
      })
    io.on("connection", async (socket:any) => {
        socket.emit('session', {
          key: socket.userID
        })
    
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
        console.log(tempNoti, 'from tempNoti..')
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
            from:data.from
          }
          await ch.notification(notifi)
          if(data.connection){
            socket.to(data.to).emit("request message", {
              content: data.content,
              from: socket.userID,
            });
          }else{
            console.log('you are not online')
            //to be saved in temporal notification
            await ch.Tempnotification(notifi)
          }
        
        });

       
        socket.on("confirm message", async (data:any) => {
          let noti = {
            to:data.to,
            from:data.from
          }
          await ch.notification(noti)


          let from = data.to    //since we wanna store in the db the 'to' becomes the 'from' as in the confirm msg is been sent from the doctor to the user so in the db the user becomes the from
          let to = data.from

          let body = {
            to,
            from,
            subs:true
          }
          let res = await ch.saveSubs(to, from, body)
          // let subs = new ChatSchema(body)
          // let saved =  await subs.save()
          console.log(res)
          if(data.connection){
            socket.to(data.to).emit("confirm message", {
              content: data.content,
              from: socket.userID,
            });
          }else{
            console.log('you are not online from confirm message')
            //save to a temporal db
            await ch.Tempnotification(noti)
          }
          

        });

       

        socket.on("private message", async(data:any) => {
          let content = {
            content: data.content,
            from: socket.userID,
            to:data.to,
            textSort: socket.userID
          }
          if(data.health){
            content.from = data.to
            content.to = socket.userID
          }
          await ch.saveChats(content)
          console.log(data.connection, 'from socket.connection')
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
            console.log('because you are not connected i console.logged you')
            let res = await ch.saveTempChats(obj)
            console.log(res)
          }
      
        });
    
        // socket.on("disconnect", async () => {
        //   const matchingSockets = await io.in(socket.userID).allSockets();
        //   const isDisconnected = matchingSockets.size === 0;
        //   if (isDisconnected) {
        //     // notify other users
        //     console.log(socket.userID, 'user disconnected')
        //     socket.broadcast.emit("user disconnected", socket.userID);
          
        //   }
        // });

          socket.on("disconnect", async () => {
                const matchingSockets = await io.in(socket.userID).allSockets();
                 const isDisconnected = matchingSockets.size === 0;
                  if (isDisconnected) {
                    // notify other users
                    socket.broadcast.emit("user disconnected", socket.userID);
                    // update the connection status of the session
                    // socket.connection = false
    }
  });
      });
}

export default chat
