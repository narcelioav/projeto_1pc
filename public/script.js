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