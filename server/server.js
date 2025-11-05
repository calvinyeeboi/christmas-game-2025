import { WebSocketServer, WebSocket } from 'ws';
import CONSTANTS from './constants.js';
import PlayerController from './controllers/player.controller.js';

const playerController = new PlayerController();
const server = new WebSocketServer({ 
    port: 8081 
});
const clients = new Set();

const handleMessage = (message, socket) => {
    const splitRoute = message.route.split('/');
    const route = splitRoute[0];
    let response = message;
    switch (route) {
        case CONSTANTS.API_ROUTES.ADMIN.ROUTE:
            sendToClients(message);
            break;
        case CONSTANTS.API_ROUTES.PLAYER.ROUTE:
            response = playerController.getResponse(response);
            break;
    }
    sendToClients(response);
}

const sendToClients = (response) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(response));
        }
    });
}

const addClient = (socket) => {
    clients.add(socket);
}

const deleteClient = (socket) => {
    clients.delete(socket);
}

server.on('connection', (socket) => {
    addClient(socket);

    socket.on('message', (message) => {
        let parsedMsg = null;
        try {
            parsedMsg = JSON.parse(Buffer.from(message).toString('utf8'));
        } catch (e) {
            console.error(e);
        }
        if (parsedMsg) {
            handleMessage(parsedMsg, socket);
        }
    });

    socket.on('close', () => {
        deleteClient(socket);
    });

    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });
});

console.log('Server running on Port: ' + 8081);