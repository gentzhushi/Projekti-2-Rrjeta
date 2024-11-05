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
const dgram = require('dgram')
const rl = require('readline')
const fileSystem = require('fs')

const client = dgram.createSocket('udp4')

const ip = 'localhost'
const port = 41234

const readLine = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n' +
    'Shenoni kerkesen tuaj:\n\n' +
    '    username; password; write <file> <message>\n' +
                    '\t\t\tread <file>\n' +
                    '\t\t\texecute <command>\n' +
                    '\t\t\tkick <username>\n' +
                    '\t\t\tprint\n' +
                    '\t\t\tlogout\n' +
                    '\t\t\t\'exit\' exit\n' +
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n', 
(answer) => {
if (answer.trim().toLowerCase() === 'exit') {
readLine.close()
return
} else {
client.send(answer, port, ip)
}
}
)

client.on('message', (msg, rinfo) => {
console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n[serveri] => \n${msg}\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
})

readLine.on('line', (input) => {
client.send(input, port, ip)
})