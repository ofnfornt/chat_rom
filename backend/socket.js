import { Server } from 'socket.io';

export function initSocket(server){
 const io = new Server(server, {
  cors:{origin:'*'}
 });

 io.on('connection',(socket)=>{
  console.log('user connected:', socket.id);

  socket.on('join', (room)=>{
   socket.join(room);
  });

  socket.on('message',(data)=>{
   io.to(data.room).emit('message',{
    user:data.user,
    text:data.text,
    time:new Date()
   });
  });

  socket.on('disconnect',()=>{
   console.log('user disconnected:', socket.id);
  });
 });

 return io;
}
