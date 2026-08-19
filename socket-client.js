const socket = io('http://localhost:3000');

const room = 'general';
const user = localStorage.getItem('user') || 'Guest';

socket.emit('join', room);

function sendMessage(){
 const input = document.getElementById('input');
 if(!input.value.trim()) return;

 socket.emit('message',{
  room,
  user,
  text: input.value
 });

 input.value='';
}

socket.on('message',(data)=>{
 const box = document.getElementById('messages');
 const item=document.createElement('div');
 item.className='msg';
 item.innerHTML=`<b>${data.user}</b>: ${data.text}`;
 box.appendChild(item);
 box.scrollTop=box.scrollHeight;
});
