const pedidos = [];
const cardapio = require("../data/cardapio");
const db = require("../config/database");

exports.listarPedidos = (req, res) => {
    res.json(pedidos);
};

exports.criarPedido = (req, res) => {

    const { itens } = req.body;

    // 🔴 Validação básica
    /*if (!pizza) {
        return res.status(400).json({
            erro: "Pizza é obrigatória"
        });
    }*/

    // 🔴 Validação
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({
            erro: "Pedido deve ter pelo menos um item"
        });
    }

    let totalPedido = 0;
    const itensProcessados = [];

    for (const item of itens) {

        const { pizza, quantidade } = item;

        if (!pizza || !quantidade) {
            return res.status(400).json({
                erro: "Cada item deve ter pizza e quantidade"
            });
        }


        // 🔍 Buscar pizza no cardápio
        const pizzaEncontrada = cardapio.find(
            //item => item.nome.toLowerCase() === pizza.toLowerCase()
            p => p.pizza.toLowerCase() === pizza.toLowerCase()
        );

        // ❌ Se não existir
        if (!pizzaEncontrada) {
            return res.status(404).json({
                erro: `Pizza '${pizza}' não encontrada no cardápio`
            });
        }

        const subtotal = pizzaEncontrada.preco * quantidade;

        totalPedido += subtotal;

        itensProcessados.push({
            pizza: pizzaEncontrada.pizza,
            quantidade,
            preco: pizzaEncontrada.preco,
            subtotal
        });
    }


    // ✅ Criar pedido com preço
    /* const novoPedido = {
         id: pedidos.length + 1,
         pizza: pizzaEncontrada.nome,
         preco: pizzaEncontrada.preco,
         total: pizzaEncontrada.preco
     };*/

    // 🟢 Inserir pedido
    db.run(
        "INSERT INTO pedidos (total) VALUES (?)",
        [totalPedido],
        function (err) {

            if (err) {
                return res.status(500).json({ erro: "Erro ao salvar pedido" });
            }

            const pedidoId = this.lastID;

            // 🟢 Inserir itens
            const stmt = db.prepare(`
                INSERT INTO itens_pedido 
                (pedido_id, pizza, quantidade, preco, subtotal)
                VALUES (?, ?, ?, ?, ?)
            `);

            itensProcessados.forEach(item => {
                stmt.run(
                    pedidoId,
                    item.pizza,
                    item.quantidade,
                    item.preco,
                    item.subtotal
                );
            });

            stmt.finalize();

            res.status(201).json({
                mensagem: "Pedido salvo no banco!",
                pedido: {
                    id: pedidoId,
                    itens: itensProcessados,
                    total: totalPedido
                }
            });
        }
    );

    /* const novoPedido = {
         id: pedidos.length + 1,
         itens: itensProcessados,
         total: totalPedido
     };
 
     pedidos.push(novoPedido);
 
     res.status(201).json({
         mensagem: "Pedido criado com sucesso!",
         pedido: novoPedido
     });*/
};