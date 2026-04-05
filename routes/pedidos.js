/*const express = require("express");
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

    res.status(201).json({kk
        mensagem: "Pedido criado!",
        pedido: novoPedido
    });
});*/

const express = require("express");
const router = express.Router();

const pedidosController = require("../controllers/pedidosController");

router.get("/", pedidosController.listarPedidos);
router.post("/", pedidosController.criarPedido);
router.get("/faturamento", pedidosController.faturamentoTotal);
router.get("/mais-vendidas", pedidosController.pizzasMaisVendidas);
router.get("/faturamento-dia", pedidosController.faturamentoPorDia);

module.exports = router;