import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { register, login } from './auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (_req,res)=>res.json({ok:true,service:'VYRO Chat'}));

app.post('/api/register', async (req,res)=>{
 try {
  const {username,password}=req.body;
  const token=await register(username,password);
  res.json({success:true,token});
 } catch(e){ res.status(400).json({success:false,error:e.message}); }
});

app.post('/api/login', async (req,res)=>{
 try {
  const {username,password}=req.body;
  const token=await login(username,password);
  res.json({success:true,token});
 } catch(e){ res.status(401).json({success:false,error:e.message}); }
});

const users = new Map();
const messages = new Map([['general', []]]);

io.on('connection',(socket)=>{
 socket.on('join',({username,room='general'})=>{
  socket.join(room); users.set(socket.id,{username,room}); socket.emit('history',messages.get(room)||[]);
 });
 socket.on('message',(text)=>{
  const user=users.get(socket.id); if(!user)return;
  const message={username:user.username,text,time:new Date().toISOString()};
  if(!messages.has(user.room))messages.set(user.room,[]);
  messages.get(user.room).push(message);
  io.to(user.room).emit('message',message);
 });
});

httpServer.listen(PORT,'0.0.0.0',()=>console.log(`VYRO Chat listening on ${PORT}`));