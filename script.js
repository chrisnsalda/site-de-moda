// =============================
// CARRINHO
// =============================

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

const checkout = document.getElementById("checkout");

// Categoria atual
let categoriaAtual = "todos";

// =============================
// MENU MOBILE
// =============================

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}

// =============================
// FILTRO DE PRODUTOS
// =============================

function filtrar(categoria) {

    categoriaAtual = categoria;

    botoesCategoria.forEach(botao => {
        botao.classList.toggle(
            "active",
            botao.dataset.category === categoria
        );
    });

    aplicarFiltros();
}

// =============================
// BUSCA + FILTRO
// =============================

function aplicarFiltros() {

    const termo = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let encontrou = false;

    produtos.forEach(produto => {

        const categoriaProduto =
            produto.dataset.category || "";

        const nomeProduto =
            produto.dataset.name
                ? produto.dataset.name.toLowerCase()
                : "";

        const correspondeCategoria =
            categoriaAtual === "todos" ||
            categoriaProduto === categoriaAtual;

        const correspondeBusca =
            termo === "" ||
            nomeProduto.includes(termo);

        if (correspondeCategoria && correspondeBusca) {

            produto.style.display = "";

            encontrou = true;

        } else {

            produto.style.display = "none";
        }
    });

    if (noResults) {
        noResults.style.display =
            encontrou ? "none" : "block";
    }
}

// =============================
// BOTÕES DE CATEGORIA
// =============================

botoesCategoria.forEach(botao => {

    botao.addEventListener("click", () => {

        const categoria =
            botao.dataset.category;

        filtrar(categoria);
    });
});

// =============================
// ADICIONAR AO CARRINHO
// =============================

function adicionar(nome, preco) {

    const precoNumerico = Number(preco);

    if (!nome || Number.isNaN(precoNumerico)) {
        return;
    }

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: precoNumerico,
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
            botao.dataset.price;

        adicionar(nome, preco);
    });
});

// =============================
// ATUALIZAR CARRINHO
// =============================

function atualizarCarrinho() {

    if (!cartItems) {
        return;
    }

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

            quantidadeTotal += produto.quantidade;

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
                        R$ ${formatarPreco(produto.preco)}
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

    if (cartCount) {
        cartCount.textContent =
            quantidadeTotal;
    }

    if (cartTotal) {
        cartTotal.textContent =
            `R$ ${formatarPreco(valorTotal)}`;
    }

    // Eventos dos botões remover
    const botoesRemover =
        cartItems.querySelectorAll(".remove-item");

    botoesRemover.forEach(botao => {

        botao.addEventListener("click", () => {

            const index =
                Number(botao.dataset.index);

            remover(index);
        });
    });
}

// =============================
// FORMATAR PREÇO
// =============================

function formatarPreco(valor) {

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");
}

// =============================
// REMOVER PRODUTO
// =============================

function remover(index) {

    if (
        index < 0 ||
        index >= carrinho.length
    ) {
        return;
    }

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// =============================
// ABRIR CARRINHO
// =============================

function abrirCarrinho() {

    if (cart) {
        cart.classList.add("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.add("active");
    }
}

// =============================
// FECHAR CARRINHO
// =============================

function fecharCarrinho() {

    if (cart) {
        cart.classList.remove("active");
    }

    if (cartOverlay) {
        cartOverlay.classList.remove("active");
    }
}

// =============================
// BOTÃO DO CARRINHO
// =============================

if (cartButton) {

    cartButton.addEventListener("click", () => {
        abrirCarrinho();
    });
}

// =============================
// FECHAR CARRINHO
// =============================

if (closeCart) {

    closeCart.addEventListener("click", () => {
        fecharCarrinho();
    });
}

if (cartOverlay) {

    cartOverlay.addEventListener("click", () => {
        fecharCarrinho();
    });
}

// =============================
// BUSCA
// =============================

if (searchButton && searchContainer) {

    searchButton.addEventListener("click", () => {

        searchContainer.classList.toggle("active");

        if (
            searchContainer.classList.contains("active") &&
            searchInput
        ) {
            searchInput.focus();
        }
    });
}

// =============================
// PESQUISAR
// =============================

if (searchInput) {

    searchInput.addEventListener("input", () => {

        aplicarFiltros();
    });
}

// =============================
// FINALIZAR COMPRA
// =============================

if (checkout) {

    checkout.addEventListener("click", () => {

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
}

// =============================
// NEWSLETTER
// =============================

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";

            if (!email) {
                alert("Digite seu e-mail.");
                return;
            }

            alert(
                `Obrigado! ${email} foi cadastrado com sucesso.`
            );

            if (emailInput) {
                emailInput.value = "";
            }
        }
    );
}

// =============================
// INICIALIZAÇÃO
// =============================

atualizarCarrinho();
filtrar("todos");
