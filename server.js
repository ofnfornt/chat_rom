import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const PORT = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/health', (_req, res) => res.json({ ok: true, service: 'VYRO Chat' }));

const users = new Map();
const messages = new Map([['general', []]]);

io.on('connection', (socket) => {
  socket.on('join', ({ username, room = 'general' }) => {
    const safeName = String(username || 'Guest').trim().slice(0, 24) || 'Guest';
    const safeRoom = String(room || 'general').trim().slice(0, 30) || 'general';
    socket.join(safeRoom);
    users.set(socket.id, { username: safeName, room: safeRoom });
    socket.emit('history', messages.get(safeRoom) || []);
    io.to(safeRoom).emit('presence', roomUsers(safeRoom));
    socket.to(safeRoom).emit('system', `${safeName} joined the room`);
  });

  socket.on('message', (text) => {
    const user = users.get(socket.id);
    if (!user || typeof text !== 'string') return;
    const clean = text.trim().slice(0, 1000);
    if (!clean) return;
    const message = { id: crypto.randomUUID(), username: user.username, text: clean, time: new Date().toISOString() };
    if (!messages.has(user.room)) messages.set(user.room, []);
    messages.get(user.room).push(message);
    messages.set(user.room, messages.get(user.room).slice(-100));
    io.to(user.room).emit('message', message);
  });

  socket.on('typing', (isTyping) => {
    const user = users.get(socket.id);
    if (user) socket.to(user.room).emit('typing', { username: user.username, isTyping: Boolean(isTyping) });
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (!user) return;
    users.delete(socket.id);
    io.to(user.room).emit('presence', roomUsers(user.room));
    io.to(user.room).emit('system', `${user.username} left the room`);
  });
});

function roomUsers(room) {
  return [...users.values()].filter((u) => u.room === room).map((u) => u.username);
}

httpServer.listen(PORT, '0.0.0.0', () => console.log(`VYRO Chat listening on ${PORT}`));