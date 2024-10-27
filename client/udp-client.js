// udp-client.js
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('Hello, UDP server!');

const PORT = 41234;
const HOST = 'localhost';

client.send(message, PORT, HOST, (error) => {
    if (error) {
        console.error('Error sending message:', error);
        client.close();
    } else {
        console.log('Message sent to server');
    }
});

client.on('message', (msg, rinfo) => {
    console.log(`Client received: ${msg} from ${rinfo.address}:${rinfo.port}`);
    client.close();
});
