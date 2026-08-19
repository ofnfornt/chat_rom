let typingTimer;
const socket = io('http://localhost:3000');

const room = 'general';

function userTyping(){
 socket.emit('typing', {
  room,
  user: localStorage.getItem('user') || 'Guest'
 });

 clearTimeout(typingTimer);
 typingTimer=setTimeout(()=>{
  socket.emit('stopTyping',{room});
 },1500);
}

socket.on('typing',(data)=>{
 const el=document.getElementById('typing');
 if(el) el.innerText=`${data.user} در حال نوشتن است...`;
});

socket.on('stopTyping',()=>{
 const el=document.getElementById('typing');
 if(el) el.innerText='';
});
