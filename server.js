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

/*1const http = require("http");
const cardapio = require("./data/cardapio");

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

        /*const cardapio = [
            { "pizza": "calabresa", "preco": 35 },
            { "pizza": "frango", "preco": 38 }
        ];*/
/*2res.end(JSON.stringify(cardapio));

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
/*3
server.listen(3000);

console.log("Servidor rodando em http://localhost:3000");
*/

/* //////////////////////////////////////////////
const http = require("http");
const cardapio = require("./data/cardapio");
const pedidos = [];

const server = http.createServer((req, res) => {
    if (req.url === "/cardapio" && req.method === "GET") {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(cardapio));
    }

    else if (req.url == "/pedidos" && req.method === "GET") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(pedidos));
    }

    /*else if (req.url === "/pedidos" && req.method === "POST") {

        pedidos.push({
            id: pedidos.length + 1,
            pizza: "calabresa"
        });

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ mensagem: "Pedido criado!" }));
    }*/

/* else if (req.url === "/pedidos" && req.method === "POST") {
     let body = "";

     req.on("data", chunk => {
         body += chunk.toString();
     });

     req.on("end", () => {
         const novoPedido = JSON.parse(body);

         pedidos.push({
             id: pedidos.length + 1,
             pizza: novoPedido.pizza
         });

         res.writeHead(201, { 'Content-Type': 'application/json' });

         res.end(JSON.stringify({
             mensagem: "Pedido criado!",
             pedido: novoPedido
         }));
     });
 }

else {
 res.writeHead(404, { 'Content-Type': 'text/plain' });
 res.end("Rota não encontrada");
}
});

server.listen(3000);

console.log("Servidor rodando em http://localhost:3000");

////////////////////////////////////////////// */


const express = require("express");

const app = express();

const pedidosRoute = require("./routes/pedidos");
const cardapio = require("./data/cardapio");

app.use(express.json());
app.use(express.static("public")); // 👈 AQUI

/*app.get("/", (req, res) => {
    res.send("API da Pizzaria Narcelio funcionando!");
});*/

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/cardapio", (req, res) => {
    res.json(cardapio);
});

app.use("/pedidos", pedidosRoute);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});