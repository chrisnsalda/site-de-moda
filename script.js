let carrinho = [];

// =============================
// ELEMENTOS
// =============================

const produtos = document.querySelectorAll(".product");
const botoesCategoria = document.querySelectorAll(".category");
const botoesAdicionar = document.querySelectorAll(".quick-add");

const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const searchButton = document.getElementById("searchButton");
const searchContainer = document.getElementById("searchContainer");
const searchInput = document.getElementById("searchInput");

const noResults = document.getElementById("noResults");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("emailInput");

const menuButton = document.getElementById("menuButton");
const nav = document.getElementById("nav");

// =============================
// MENU MOBILE
// =============================

menuButton.addEventListener("click", () => {

nav.classList.toggle("active");


});

// Fecha o menu ao clicar em um link

nav.querySelectorAll("a").forEach(link => {

link.addEventListener("click", () => {

    nav.classList.remove("active");

});


});

// =============================
// FILTRO DE PRODUTOS
// =============================

function filtrar(categoria) {

let encontrou = false;

botoesCategoria.forEach(botao => {

    botao.classList.remove("active");

    if (botao.dataset.category === categoria) {
        botao.classList.add("active");
    }

});

produtos.forEach(produto => {

    const categoriaProduto =
        produto.dataset.category;

    if (
        categoria === "todos" ||
        categoriaProduto === categoria
    ) {

        produto.style.display = "";

        encontrou = true;

    } else {

        produto.style.display = "none";

    }

});

noResults.style.display =
    encontrou ? "none" : "block";


}

// =============================
// BOTÕES DE CATEGORIA
// =============================

botoesCategoria.forEach(botao => {

botao.addEventListener("click", () => {

    filtrar(botao.dataset.category);

});


});

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
        preco: Number(preco),
        quantidade: 1
    });

}

atualizarCarrinho();

abrirCarrinho();


}

// =============================
// BOTÕES ADICIONAR
// =============================

botoesAdicionar.forEach(botao => {

botao.addEventListener("click", () => {

    const nome =
        botao.dataset.product;

    const preco =
        Number(botao.dataset.price);

    adicionar(nome, preco);

});


});

// =============================
// ATUALIZAR CARRINHO
// =============================

function atualizarCarrinho() {

cartItems.innerHTML = "";

let quantidadeTotal = 0;
let valorTotal = 0;

if (carrinho.length === 0) {

    cartItems.innerHTML = `
        <p class="empty-cart">
            Seu carrinho está vazio.
        </p>
    `;

} else {

    carrinho.forEach((produto, index) => {

        quantidadeTotal +=
            produto.quantidade;

        valorTotal +=
            produto.preco *
            produto.quantidade;

        const item =
            document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
            <div class="cart-item-info">

                <h4>
                    ${produto.nome}
                </h4>

                <p>
                    ${produto.quantidade}x
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}">
                Remover
            </button>
        `;

        cartItems.appendChild(item);

    });

}

cartCount.textContent =
    quantidadeTotal;

cartTotal.textContent =
    "R$ " +
    valorTotal
        .toFixed(2)
        .replace(".", ",");


// Botões remover

const botoesRemover =
    document.querySelectorAll(".remove-item");

botoesRemover.forEach(botao => {

    botao.addEventListener("click", () => {

        const index =
            Number(botao.dataset.index);

        remover(index);

    });

});


}

// =============================
// REMOVER
// =============================

function remover(index) {

carrinho.splice(index, 1);

atualizarCarrinho();


}

// =============================
// ABRIR CARRINHO
// =============================

function abrirCarrinho() {

cart.classList.add("active");

cartOverlay.classList.add("active");


}

// =============================
// FECHAR CARRINHO
// =============================

function fecharCarrinho() {

cart.classList.remove("active");

cartOverlay.classList.remove("active");


}

cartButton.addEventListener("click", () => {

abrirCarrinho();


});

closeCart.addEventListener("click", () => {

fecharCarrinho();


});

cartOverlay.addEventListener("click", () => {

fecharCarrinho();


});

// =============================
// BUSCA
// =============================

searchButton.addEventListener("click", () => {

searchContainer.classList.toggle("active");

if (
    searchContainer.classList.contains("active")
) {

    searchInput.focus();

}


});

// =============================
// PESQUISAR
// =============================

searchInput.addEventListener("input", () => {

const termo =
    searchInput.value
        .toLowerCase()
        .trim();

let encontrou = false;

produtos.forEach(produto => {

    const nome =
        produto.dataset.name
            .toLowerCase();

    if (
        nome.includes(termo)
    ) {

        produto.style.display = "";

        encontrou = true;

    } else {

        produto.style.display = "none";

    }

});

noResults.style.display =
    encontrou ? "none" : "block";


});

// =============================
// FINALIZAR COMPRA
// =============================

document
.getElementById("checkout")
.addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio."
        );

        return;
    }

    alert(
        "Obrigado pela compra! " +
        "Esta é uma demonstração " +
        "do checkout."
    );

});


// =============================
// NEWSLETTER
// =============================

newsletterForm.addEventListener(
"submit",
event => {

    event.preventDefault();

    const email =
        emailInput.value.trim();

    if (!email) {
        return;
    }

    alert(
        `Obrigado! ${email} foi cadastrado com sucesso.`
    );

    emailInput.value = "";

}


);

// =============================
// INICIALIZAÇÃO
// =============================

atualizarCarrinho();