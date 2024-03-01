/*import http from "http";

import express from "express";
import { WebSocketServer } from "ws";

const port = 5500;
const app = express();
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

 let clients = new Set();

wss.on("connection", function connection(ws) {
    console.log("Client is connected");

    clients.add(ws);

    ws.on("message", function incoming(data) {
        console.log("Received message: ", Buffer.from(data).toString("utf8"));

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.ReadyState === ws.readyState) {
                client.send(data);
            }
        });
    })

    ws.on("close", function () {
        console.log("Client has left the chat");
    });

    server.listen(port, function () {
        console.log(`Server is listening on port ${port}`);
    });
})
*/







/*import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 5500 });

wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("message", message => {
        console.log("Received message: ", message);
        wss.clients.forEach(client => {
            if (client !== ws) {
                client.send(`Client: ${message}`);
            }
        });
        ws.send(`Sender: ${message}`)
    });
    
    ws.on("close", () => {
        console.log("Client disconnected");
    });
})
*/

import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';

const port = 5500;
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
    console.log("Client is connected");

    ws.on("message", function incoming(data) {
        console.log("Received message: ", Buffer.from(data).toString("utf8"));

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.readyState) {
                client.send(data);
            }
        });
    })

    ws.on("close", function () {
        console.log("Client has left the chat");
    });
});

server.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});