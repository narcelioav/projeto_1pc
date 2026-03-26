const pedidos = [];

exports.listarPedidos = (req, res) => {
    res.json(pedidos);
};

exports.criarPedido = (req, res) => {

    const { pizza } = req.body;

    if (!pizza) {
        return res.status(400).json({
            erro: "Pizza é obrigatória"
        });
    }


    const novoPedido = {
        id: pedidos.length + 1,
        pizza
    };

    pedidos.push(novoPedido);

    res.status(201).json({
        mensagem: "Pedido criado!",
        pedido: novoPedido
    });
};