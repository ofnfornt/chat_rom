const onlineUsers = new Map();

export function setupPresence(io){
 io.on('connection',(socket)=>{
  socket.on('user-online',(user)=>{
   onlineUsers.set(socket.id,user);
   io.emit('online-users',Array.from(onlineUsers.values()));
  });

  socket.on('disconnect',()=>{
   onlineUsers.delete(socket.id);
   io.emit('online-users',Array.from(onlineUsers.values()));
  });
 });
}
