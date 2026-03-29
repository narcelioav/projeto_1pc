const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err);
    } else {
        console.log("Banco conectado com sucesso!");
    }


    db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total REAL
    )
`);

    db.run(`
    CREATE TABLE IF NOT EXISTS itens_pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER,
        pizza TEXT,
        quantidade INTEGER,
        preco REAL,
        subtotal REAL,
        FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
    )
    `);

});

module.exports = db;
