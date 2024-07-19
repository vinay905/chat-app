const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 7070 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
    const messageData = JSON.parse(data);
    console.log(`Received message from ${messageData.sender}: ${messageData.message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          sender: messageData.sender,
          message: messageData.message
        }));
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:7070');
