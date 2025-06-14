import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const messages: string[] = [];

wss.on('connection', ws => {
  console.log('🔌 Client connected');

  // Send all previous messages
  messages.forEach(msg => ws.send(msg));

  // Receive new messages
  ws.on('message', data => {
    const message = data.toString();
    messages.push(message);

    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });
});
