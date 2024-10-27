// udp-server.js
const dgram = require('dgram');

// krijimi i socketit per udp
const server = dgram.createSocket('udp4');

// mesazhet vijn procedura
server.on('message', (msg, rinfo) => {
    console.log(`serveri morri mesazhin: '${msg}' nga '${rinfo.address}:${rinfo.port}'`);
    // client respondi
    const response = Buffer.from('pershendetje nga serveri, protokoli udp');
    server.send(response, rinfo.port, rinfo.address, (error) => {
        if (error) {
            console.error('Error gjate mesazhit: ', error);
        } else {
            console.log('Mesazhi u dergua! S->C');
        }
    });
});

// socketi per server
const PORT = 41234;
const HOST = 'localhost';

server.bind(PORT, HOST, () => {
    console.log(`socketi serverit udp: '${HOST}:${PORT}'`);
});

// handle error nese ka
server.on('error', (error) => {
    console.error(`server error: ${error}`);
    server.close();
});