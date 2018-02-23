const express = require('express');
const WebSocket = require('ws');
const uuidV1 = require('uuid/v1');

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

// Random a color
// Obs: System is 'black' (set when the  message is created)
function getRandomColor() {
  const hexadecinalDigits = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexadecinalDigits[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to broadcast message
function broadcast(dataObj) { 
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(dataObj));
    }
  }
}

 // Broadcast number of users connected and message
function broadcastNumConnected(num, joinedOrLeft) {
  const msgNumUsers = {
    id: uuidV1(),
    username: 'System',
    userColor: 'black',
    type: 'numberUsersConnectedNotification', 
    numberUsersConnected: num,
    content: `A user ${joinedOrLeft} the channel.`
  };
  broadcast(msgNumUsers);
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send color to user after conextion
  ws.color = getRandomColor();

  // Broadcast number of users connected when new one joints
  broadcastNumConnected(wss.clients.size, 'joined');

  // Get message or notification from client, set UUID and broadcast it
  ws.on('message', (message) => {
    const msgObj = JSON.parse(message);
    let newMsg = '';
    switch (msgObj.type) {

      case 'postNotification':
        newMsg = {id: uuidV1(), type: 'incomingNotification', username: 'System', userColor: 'black', content: `${msgObj.oldUserName} changed their name to ${msgObj.newUserName}`}
        broadcast(newMsg);
        break;

      default:
        // Get user color back here (ws.color)
        newMsg = {id: uuidV1(), type: 'incomingMessage', username: msgObj.username, userColor: ws.color, content:  msgObj.content}
        broadcast(newMsg);
      }
  });

  ws.on('error', () => {});
  ws.on('close', () => {
    console.log('Client disconnected');
    
    // Broadcast number of users connected when new one leaves
    broadcastNumConnected(wss.clients.size, 'left');
  });
});