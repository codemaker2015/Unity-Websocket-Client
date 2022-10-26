const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const port = 3000;

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function(ws) {
  console.log("Client connected");

  const textInterval = setInterval(() => ws.send("hello world"), 100);

  ws.on('message', function(data) {
      console.log("Client: " + data);
  });

  ws.on('close', function() {
    console.log("Client disconnected");
    clearInterval(textInterval);
  });
});

server.listen(port, function() {
  console.log(`Listening on http://localhost:${port}`);
});
