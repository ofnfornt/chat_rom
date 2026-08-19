import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Database connected'));

const User=mongoose.model('User',new mongoose.Schema({name:String,email:{type:String,unique:true},password:String}));

app.post('/register',async(req,res)=>{
 const {name,email,password}=req.body;
 const hash=await bcrypt.hash(password,10);
 await User.create({name,email,password:hash});
 res.json({message:'registered'});
});

app.post('/login',async(req,res)=>{
 const user=await User.findOne({email:req.body.email});
 if(!user)return res.status(401).json({error:'invalid login'});
 const ok=await bcrypt.compare(req.body.password,user.password);
 if(!ok)return res.status(401).json({error:'invalid login'});
 const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
 res.json({token,user:user.name});
});

app.listen(3000,()=>console.log('ChatRom API running'));
