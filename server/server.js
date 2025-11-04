import { WebSocketServer, WebSocket } from 'ws';

const server = new WebSocketServer({ 
    port: 8081 
});

const clients = new Set();

server.on('connection', (socket) => {
    clients.add(socket);
    
    socket.on('message', (message, isBinary) => {
        clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message, { binary: isBinary });
            }
        });
    });

    socket.on('close', () => {
        clients.delete(socket);
    });

    socket.on('error', (error) => {
        console.error(`Socket error: ${error.message}`);
    });
});

console.log('Server running on Port: ' + 8081);