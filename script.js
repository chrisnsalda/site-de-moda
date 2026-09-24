let carrinho = [];


// =============================
// FILTRO DE PRODUTOS
// =============================

function filtrar(categoria, botao) {

    const produtos = document.querySelectorAll(".product");
    const botoes = document.querySelectorAll(".filter");

    botoes.forEach(btn => {
        btn.classList.remove("active");
    });

    botao.classList.add("active");

    produtos.forEach(produto => {

        const categoriaProduto = produto.dataset.categoria;

        if (
            categoria === "todos" ||
            categoriaProduto === categoria
        ) {
            produto.style.display = "block";
        } else {
            produto.style.display = "none";
        }

    });
}


// =============================
// ADICIONAR AO CARRINHO
// =============================

function adicionar(nome, preco) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();
    abrirCarrinho();
}


// =============================
// ATUALIZAR CARRINHO
// =============================

function atualizarCarrinho() {

    const container = document.getElementById("itensCarrinho");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    container.innerHTML = "";

    let quantidadeTotal = 0;
    let valorTotal = 0;

    if (carrinho.length === 0) {

        container.innerHTML = `
            <p class="empty">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        carrinho.forEach((produto, index) => {

            quantidadeTotal += produto.quantidade;

            valorTotal +=
                produto.preco * produto.quantidade;

            const item = document.createElement("div");

            item.classList.add("cart-item");

            item.innerHTML = `
                <div>
                    <h4>${produto.nome}</h4>

                    <p>
                        ${produto.quantidade}x
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </p>
                </div>

                <button
                    class="remove"
                    onclick="remover(${index})">
                    Remover
                </button>
            `;

            container.appendChild(item);

        });

    }

    contador.textContent = quantidadeTotal;

    totalElemento.textContent =
        "R$ " +
        valorTotal.toFixed(2).replace(".", ",");
}


// =============================
// REMOVER PRODUTO
// =============================

function remover(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// =============================
// ABRIR CARRINHO
// =============================

function abrirCarrinho() {

    document.getElementById("cart").classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");
}


// =============================
// FECHAR CARRINHO
// =============================

function fecharCarrinho() {

    document
        .getElementById("cart")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");
}


// =============================
// FINALIZAR COMPRA
// =============================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }

    alert(
        "Obrigado pela compra! " +
        "Esta é uma demonstração do checkout."
    );
}


// =============================
// NEWSLETTER
// =============================

function inscrever(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    document.getElementById("mensagem").textContent =
        `Obrigado! ${email} foi cadastrado com sucesso.`;

    document.getElementById("email").value = "";
}


// =============================
// INICIALIZAÇÃO
// =============================

atualizarCarrinho();
