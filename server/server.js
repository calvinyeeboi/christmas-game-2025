import { WebSocketServer, WebSocket } from 'ws';

const server = new WebSocketServer({ 
    port: 8081 
});

const clients = new Set();

const sendMessage = (message, socket) => {
    const splitRoute = message.route.split('/');
    const route = splitRoute[0];
    const method = splitRoute[1];
    clients.forEach((client) => {
        if ((client !== socket || route === 'admin') && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

server.on('connection', (socket) => {
    clients.add(socket);

    socket.on('message', (message) => {
        let parsedMsg = null;
        try {
            parsedMsg = JSON.parse(Buffer.from(message).toString('utf8'));
        } catch (e) {
            console.error(e);
        }
        if (parsedMsg) {
            sendMessage(parsedMsg, socket);
        }
    });

    socket.on('close', () => {
        clients.delete(socket);
    });

    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });
});

console.log('Server running on Port: ' + 8081);