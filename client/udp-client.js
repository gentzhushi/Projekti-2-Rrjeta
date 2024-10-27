// udp-client.js
const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const message = Buffer.from('ckm;)');

const PORT = 41234;
const HOST = 'localhost';

client.send(message, PORT, HOST, (error) => {
    if (error) {
        console.error('error gjate mesazhit: ', error);
        client.close();
    } else {
        console.log('mesazhi u dergua! C->S');
    }
});

// pytja
client.on('message', (msg, rinfo) => {
    console.log(`klienti morri mesazhin: '${msg}' nga '${rinfo.address}:${rinfo.port}'`);
    client.close();
});