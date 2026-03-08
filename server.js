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

/*const http = require('http');

const server = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/plain' });

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
*/

/*const http = require("http");

const server = http.createServer((req, res) => {
    if (req.url === "/pedidos") {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        const pedidos = [
            { id: 1, pizza: "calabresa" },
            { id: 2, pizza: "frango" }
        ];

        res.end(JSON.stringify(pedidos));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Servidor da pizzaria rodando!");
    }
});

server.listen(3000);

console.log("Servidor rodando em http://localhost:3000");
*/

const http = require("http");

const server = http.createServer((req, res) => {

    if (req.url === "/") {

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Página inicial");
    }
    else if (req.url === "/pedidos") {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        const pedidos = [
            { id: 1, pizza: "calabresa" },
            { id: 2, pizza: "frango" }
        ];

        res.end(JSON.stringify(pedidos));

    } else if (req.url === "/cardapio") {

        res.writeHead(200, { 'Content-Type': 'application/json' });

        const cardapio = [
            { "pizza": "calabresa", "preco": 35 },
            { "pizza": "frango", "preco": 38 }
        ];

        res.end(JSON.stringify(cardapio));

    }
    else if (req.url === "/sobre") {

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end("Sobre o Narcelio Dev");
    }
    else {


        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Pagina não encontrada");

        //res.end("Servidor da pizzaria rodando!");
    }

    //res.end();
});

/*server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});*/

server.listen(3000);

console.log("Servidor rodando em http://localhost:3000");