import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'vyro-secret-change';
const users = new Map();

export async function register(username, password) {
  if (users.has(username)) throw new Error('Username exists');
  const hash = await bcrypt.hash(password, 10);
  const user = { username, password: hash };
  users.set(username, user);
  return token(user);
}

export async function login(username, password) {
  const user = users.get(username);
  if (!user || !(await bcrypt.compare(password, user.password))) throw new Error('Invalid login');
  return token(user);
}

function token(user) {
  return jwt.sign({ username: user.username }, SECRET, { expiresIn: '7d' });
}
