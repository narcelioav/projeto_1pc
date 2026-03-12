const express = require("express");

const router = express.Router();

const pedidos = [];

router.get("/", (req, res) => {
    res.json(pedidos);
});

router.post("/", (req, res) => {

    const novoPedido = {
        id: pedidos.length + 1,
        pizza: req.body.pizza
    };

    pedidos.push(novoPedido);

    res.status(201).json({
        mensagem: "Pedido criado!",
        pedido: novoPedido
    });
});

module.express = router;