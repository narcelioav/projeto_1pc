/*const http = require('http');

const server = http.createServer((req, res) => {
  res.end("Servidor rodando");
});

server.listen(3000);
*/
/*
const http = require('http');

const server = http.createServer((req, res) => {
    res.write("Narcelio backend em reconstrução!");
    res.end();
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
*/

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Página inicial");
    } else if (req.url === "/sobre") {
        res.write("Sobre o Narcelio Dev");
    } else {
        res.write("Pagina não encontrada");
    }

    res.end();
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});