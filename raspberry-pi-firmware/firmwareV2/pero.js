const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const process = require('process');
let sleep = require('sleep');

if (cluster.isPrimary) {

    for (let i = 1; i <= 1; i++) {
        cluster.fork();
    }

    sleep.msleep(10000);

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    http.get("http://localhost:8000/random?motor=1", res => {

        let data = [];
        res.on("data", dataChunk => {
            data.push(dataChunk)
        })

        res.on("end", () => {
            data = Buffer.concat(data).toString();
            console.log(data);
        })
    }).on("error", err => {
        console.log(err);
    })

    http.get("http://localhost:8000/random?motor=2", res => {

        let data = [];
        res.on("data", dataChunk => {
            data.push(dataChunk)
        })

        res.on("end", () => {
            data = Buffer.concat(data).toString();
            console.log(data);
        })
    }).on("error", err => {
        console.log(err);
    })


}
else {

    console.log(`Worker ${process.pid} started`);

    let server = http.createServer((req, res) => {

        res.writeHead(200);
        console.log(req.url);
        sleep.msleep(10000);
        res.end('hello world\n');

    }).listen(8000);

    server.timeout = 20000;

}