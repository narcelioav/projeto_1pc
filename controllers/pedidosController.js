const pedidos = [];
const cardapio = require("../data/cardapio");
const db = require("../config/database");

/*exports.listarPedidos = (req, res) => {
    res.json(pedidos);
};*/

exports.listarPedidos = (req, res) => {

    db.all("SELECT * FROM pedidos", [], (err, pedidos) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar pedidos" });
        }

        if (pedidos.length === 0) {
            return res.json([]);
        }

        // Para cada pedido, busca itens
        const pedidosComItens = [];

        let processados = 0;

        pedidos.forEach((pedido, index) => {
            db.all(
                "SELECT pizza, quantidade, preco, subtotal FROM itens_pedido WHERE pedido_id = ?",
                [pedido.id],
                (err, itens) => {

                    pedidosComItens[index] = {
                        id: pedido.id,
                        itens,
                        total: pedido.total
                    };

                    processados++;

                    if (processados === pedidos.length) {
                        res.json(pedidosComItens);
                    }
                }
            );
        });
    });
};

exports.faturamentoTotal = (req, res) => {

    db.get("SELECT SUM(total) as total FROM pedidos", [], (err, result) => {

        if (err) {
            return res.status(500).json({ erro: "Erro ao calcular faturamento" });
        }

        res.json({
            faturamento: result.total || 0
        });
    });
};

exports.pizzasMaisVendidas = (req, res) => {

    db.all(`
        SELECT pizza, SUM(quantidade) as total_vendido
        FROM itens_pedido
        GROUP BY pizza
        ORDER BY total_vendido DESC
    `, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar dados" });
        }

        res.json(rows);
    });
};

exports.faturamentoPorDia = (req, res) => {

    db.all(`
        SELECT DATE(data) as dia, SUM(total) as total
        FROM pedidos
        GROUP BY DATE(data)
        ORDER BY dia DESC
    `, [], (err, rows) => {

        if (err) {
            return res.status(500).json({ erro: "Erro ao calcular faturamento por dia" });
        }

        res.json(rows);
    });
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