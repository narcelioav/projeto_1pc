// 🔄 Função para carregar tudo
function carregarDados() {

    // 🔥 Faturamento
    fetch("http://localhost:3000/pedidos/faturamento")
        .then(res => res.json())
        .then(data => {
            document.getElementById("faturamento").innerText = "R$ " + data.faturamento;
        });

    // 🍕 Mais vendidas
    fetch("http://localhost:3000/pedidos/mais-vendidas")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("maisVendidas");

            lista.innerHTML = ""; // 🔥 CORREÇÃO AQUI

            data.forEach(item => {
                const li = document.createElement("li");
                li.innerText = `${item.pizza} - ${item.total_vendido}`;
                lista.appendChild(li);
            });
        });

    // 📋 Pedidos
    fetch("http://localhost:3000/pedidos")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("pedidos");
            lista.innerHTML = "";

            data.forEach(pedido => {
                const li = document.createElement("li");
                li.innerText = `Pedido #${pedido.id} - Total: R$ ${pedido.total}`;
                lista.appendChild(li);
            });
        });
}

// 🚀 roda na primeira vez
carregarDados();

// 🔁 atualiza a cada 5 segundos
setInterval(carregarDados, 5000);

function filtrar() {
    const data = document.getElementById("dataFiltro").value;

    fetch(`http://localhost:3000/pedidos/faturamento-data?data=${data}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("faturamentoData").innerText =
                `Faturamento em ${data.data}: R$ ${data.total}`;
        });
}

function criarPedido() {

    const pizza = document.getElementById("pizza").value;
    const quantidade = document.getElementById("quantidade").value;

    fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            itens: [
                { pizza, quantidade: Number(quantidade) }
            ]
        })
    })
        .then(res => res.json())
        .then(() => {
            alert("Pedido criado!");
            carregarDados(); // atualiza painel
        });
}