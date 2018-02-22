const express = require('express');
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = 
  express()
  .use(express
  .static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => 
    console.log(`Listening on port ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Function to broadcast message
function broadcast(data) { 
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Get message from client, set UUID and save to array "messages"
  ws.on('message', (message) => {
    const msgObj = JSON.parse(message);
    const newMsg = {id: uuidv1(), username: msgObj.username, content:  msgObj.content}
    broadcast(JSON.stringify(newMsg));
  });

  ws.on('error', () => {});
  ws.on('close', () => console.log('Client disconnected'));
});

