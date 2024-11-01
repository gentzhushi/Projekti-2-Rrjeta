/**
 * Serveri
 * DONE 1. Të vendosen variabla te cilat përmbajnë numrin e portit (numri i portit të jetë i çfarëdoshëm) dhe IP adresën;
 * DONE 2. Të jetë në gjendje të dëgjojë (listen) të paktën të gjithë anëtaret e grupit. Nëse numri i lidhjeve kalon një prag të caktuar, serveri duhet të refuzojë lidhjet e reja ose t'i vë në pritje;
 *  3. Të menaxhojë kërkesat e pajisjeve që dërgojnë request (ku secili anëtar i grupit duhet ta ekzekutojë të paktën një kërkesë në server) dhe t’i logojë të gjitha për auditim të mëvonshëm, duke përfshirë timestamp dhe IP-në e dërguesit;
 *  4. Të jetë në gjendje të lexoje mesazhet që dërgohen nga klientët dhe t’i ruajë për monitorim;
 *  5. Nëse një klient nuk dërgon mesazhe brenda një periudhe të caktuar kohe, serveri duhet ta mbyllë lidhjen dhe të jetë në gjendje ta rikuperojë atë automatikisht nëse klienti rifutet;
 *  6. Të jetë në gjendje të jap qasje të plotë të paktën njërit klient për qasje në folderat/ përmbajtjen në file-t në server.
 */

/*
    in a nutshell, ka me kan ni server, kan me kan 4 klienta, 1 admin, admin shkrun edhe lexon me ni file arbitrar,
    tjert veq mujn me lexu fajllin
*/

/*
    TODO:
        3. mi funksionale kerkesat e klientave n server, si dhe mi logu me ni file me clientkey dhe timestamp(timestamp sigurisht merret prej naj libraris ok!)
        4.1 - ti ruaj per monitorim
        5 - me mbyll/rikuperu lidhjen
        6 - mi jep adminit full access per folderat ne server(sigurisht me qita require'fs'&'path')
*/

const ip = 'localhost'
const port = 41234 // port qe perdoret per tcp/udps
const maxClients = 4

const dataGram = require('dgram')
const fileSystem = require('fs') // me shkru&lexu fajlla
const path = require('path')

const server = dataGram.createSocket('udp4')

let clients = {}
let admin

server.bind(port, ip) // anllaseri (T-T)

server.on('message', (msg, remoteInfo) => {

    const clientKey = `${remoteInfo.address}:${remoteInfo.port}`

    if(clients[clientKey]){ // kqyr a osht klient per momentin, nese po veq merre mesazhin
        console.log(`Mesazhi nga client [${clientKey}], i cili u kan registered: s\n\t'${msg.toString().trimEnd()}'`)
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        return
    }

    if(!clients[clientKey] && Object.keys(clients).length < maxClients){ // nese nuk eksiston ky user, dhe ka hapsir ...
        clients[clientKey] = { // shtoje userin sikur standard user
                                address: remoteInfo.address,
                                port: remoteInfo.port,
                                isAdmin: false
                            }
        if(Object.keys(clients).length === 1){
            clients[clientKey].isAdmin = true
            admin = clientKey // clients[admin] => admini
            server.send('Ti je admini broski', remoteInfo.port, remoteInfo.address, (err) => {
                if(err){
                    console.error('Mesazhi nuk shkoi! [admin]')
                }
            })
            console.log(`U shtua ADMINI me mesazh:\n\t'${msg.toString().trimEnd()}'`)
        } else {
            server.send('Pershendetje koleg standard!', remoteInfo.port, remoteInfo.address, (err) => {
                if(err){
                    console.error('Mesazhi nuk shkoi! [standard]')
                }
            })
            console.log(`U shtua nje KLIENT STANDARD me mesazh:\n\t'${msg.toString().trimEnd()}'`)
        }
        // console.log(`Klientat per momentin: ${JSON.stringify(clients, null, 2)}`)
    } else if (Object.keys(clients).length >= maxClients) {
        server.send('Serveri eshte plot!', remoteInfo.port, remoteInfo.address)
        console.log('Provoj dikush me hi, po spat ven!')
    } else {
        server.send('Je regjistru ma heret bre bro...', remoteInfo.port, remoteInfo.address)
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
})

server.on('listening', () => { // kur tja nis me listen log this:
    const address = server.address()
    console.log(`Server listening on '${address.address}:${address.port}'`)
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
})

server.on('close', () => { // log kur t mshelet
    console.log('Arrivederci')
})

server.on('error', (err) => { // log errorin
    console.error(`Server error: \n\t${err.name} - ${err.message}`)
})