/**
 * Serveri
 *  1. Të vendosen variabla te cilat përmbajnë numrin e portit (numri i portit të jetë i çfarëdoshëm) dhe IP adresën;
 *  2. Të jetë në gjendje të dëgjojë (listën) të paktën të gjithë anëtaret e grupit. Nëse numri i lidhjeve kalon një prag të caktuar, serveri duhet të refuzojë lidhjet e reja ose t'i vë në pritje;
 *  3. Të menaxhojë kërkesat e pajisjeve që dërgojnë request (ku secili anëtar i grupit duhet ta ekzekutojë të paktën një kërkesë në server) dhe t’i logojë të gjitha për auditim të mëvonshëm, duke përfshirë timestamp dhe IP-në e dërguesit;
 *  4. Të jetë në gjendje të lexoje mesazhet që dërgohen nga klientët dhe t’i ruajë për monitorim;
 *  5. Nëse një klient nuk dërgon mesazhe brenda një periudhe të caktuar kohe, serveri duhet ta mbyllë lidhjen dhe të jetë në gjendje ta rikuperojë atë automatikisht nëse klienti rifutet;
 *  6. Të jetë në gjendje të jap qasje të plotë të paktën njërit klient për qasje në folderat/ përmbajtjen në file-t në server.
 */

// udp-server.js
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const HOST = 'localhost';
const PORT = 41234;

// pytja
server.on('message', (msg, rinfo) => {
    console.log(`serveri morri mesazhin: '${msg}' nga '${rinfo.address}:${rinfo.port}'`);
    // pergjigjja
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
server.bind(PORT, HOST, () => {
    console.log(`socketi serverit udp: '${HOST}:${PORT}'`);
});

// handle error nese ka
server.on('error', (error) => {
    console.error(`server error: ${error}`);
    server.close();
});