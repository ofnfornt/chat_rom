export function setupGroups(io){
 io.on('connection',(socket)=>{
  socket.on('joinGroup',(groupId)=>{
   socket.join('group_'+groupId);
  });

  socket.on('groupMessage',(data)=>{
   io.to('group_'+data.groupId).emit('groupMessage',{
    user:data.user,
    text:data.text,
    time:new Date()
   });
  });
 });
}
