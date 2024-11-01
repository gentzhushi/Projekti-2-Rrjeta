/**
 * Klienti
 *  1. Të krijohet socket lidhja me server;
 *  2. Njëri nga pajisjet (klientët) të ketë privilegjet write(), read(), execute() (qasje të plotë; execute() përfshin ekzekutimin e komandave të ndryshme në server);
 *  3. Klientët tjerë të kenë vetëm read() permission;
 *  4. Të behet lidhja me serverin duke përcaktuar saktë portin dhe IP Adresën e serverit;
 *  5. Të definohen saktë socket-at e serverit dhe lidhja të mos dështojë;
 *  6. Të jetë në gjendje të lexojë përgjigjet që i kthehen nga serveri;
 *  7. Të dërgojë mesazh serverit në formë të tekstit;
 *  8. Të ketë qasje të plotë në folderat/përmbajtjen në server;
 *  9. Klientët me privilegje të plota të kenë kohë përgjigjeje më të shpejtë se klientët e tjerë që kanë vetëm read permission.
 */
 
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