import bcrypt from 'bcryptjs';
import fs from 'node:fs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'vyro-secret-change';
const DB = './users.json';
if (!fs.existsSync(DB)) fs.writeFileSync(DB,'[]');
const readUsers=()=>JSON.parse(fs.readFileSync(DB,'utf8'));
const saveUsers=(u)=>fs.writeFileSync(DB,JSON.stringify(u,null,2));

export async function register(username,password){
 const users=readUsers();
 if(users.find(u=>u.username===username)) throw new Error('Username exists');
 const user={id:crypto.randomUUID(),username,password:await bcrypt.hash(password,10)};
 users.push(user); saveUsers(users); return token(user);
}

export async function login(username,password){
 const user=readUsers().find(u=>u.username===username);
 if(!user || !(await bcrypt.compare(password,user.password))) throw new Error('Invalid login');
 return token(user);
}

function token(user){return jwt.sign({username:user.username,id:user.id},SECRET,{expiresIn:'7d'});}
