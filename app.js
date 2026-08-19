let user={name:'User',online:true};

function sendMessage(){
 const input=document.getElementById('input');
 const text=input.value.trim();
 if(!text)return;
 const box=document.getElementById('messages');
 const msg=document.createElement('div');
 msg.className='msg new';
 msg.innerText=text;
 box.appendChild(msg);
 input.value='';
 box.scrollTop=box.scrollHeight;
 setTimeout(()=>receiveMessage(),800);
}

function receiveMessage(){
 const box=document.getElementById('messages');
 const msg=document.createElement('div');
 msg.className='msg bot';
 msg.innerText='پیام شما دریافت شد ✅';
 box.appendChild(msg);
}

document.addEventListener('keydown',e=>{
 if(e.key==='Enter') sendMessage();
});