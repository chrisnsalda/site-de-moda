// ================================
// MENU MOBILE
// ================================

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});


// ================================
// CARRINHO
// ================================

const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

// Botão finalizar compra
const checkoutButton = document.querySelector(".checkout");

let cartProducts = [];


// Abrir carrinho
function openCart() {
  cart.classList.add("active");
  overlay.classList.add("active");
}


// Fechar carrinho
function closeCartPanel() {
  cart.classList.remove("active");
  overlay.classList.remove("active");
}


cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
overlay.addEventListener("click", closeCartPanel);


// ================================
// ADICIONAR PRODUTO
// ================================

document.querySelectorAll(".add-cart").forEach(button => {

  button.addEventListener("click", () => {

    const product = button.dataset.product;
    const price = Number(button.dataset.price);

    cartProducts.push({
      product,
      price
    });

    updateCart();

    openCart();
  });

});


// ================================
// ATUALIZAR CARRINHO
// ================================

function updateCart() {

  cartCount.textContent = cartProducts.length;

  // Carrinho vazio
  if (cartProducts.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio.
      </p>
    `;

    cartTotal.textContent = "R$ 0";

    return;
  }


  // Limpa os itens anteriores
  cartItems.innerHTML = "";


  // Cria os produtos
  cartProducts.forEach((item, index) => {

    const element = document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `
      <div>
        <h4>${item.product}</h4>
        <span>
          R$ ${item.price.toFixed(2).replace(".", ",")}
        </span>
      </div>

      <button
        class="remove-item"
        data-index="${index}"
        type="button"
      >
        Remover
      </button>
    `;

    cartItems.appendChild(element);
  });


  // Calcula o total
  const total = cartProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );


  cartTotal.textContent =
    `R$ ${total.toFixed(2).replace(".", ",")}`;


  // Botões de remover
  document.querySelectorAll(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.index);

      cartProducts.splice(index, 1);

      updateCart();
    });

  });
}


// ================================
// CHECKOUT POR E-MAIL
// ================================

const checkoutButton =
  document.querySelector(".checkout");

const checkoutModal =
  document.getElementById("checkoutModal");

const closeCheckout =
  document.getElementById("closeCheckout");

const checkoutForm =
  document.getElementById("checkoutForm");

const checkoutStatus =
  document.getElementById("checkoutStatus");

const orderProducts =
  document.getElementById("orderProducts");

const orderTotal =
  document.getElementById("orderTotal");


// Abrir checkout
checkoutButton.addEventListener("click", () => {

  if (cartProducts.length === 0) {

    alert(
      "Seu carrinho está vazio. Adicione uma peça antes de finalizar."
    );

    return;
  }


  // Produtos
  const productsText = cartProducts
    .map((item, index) => {

      return `${index + 1}. ${item.product} — R$ ${item.price
        .toFixed(2)
        .replace(".", ",")}`;

    })
    .join("\n");


  // Total
  const total = cartProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );


  const totalFormatted =
    total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });


  // Coloca os dados nos campos escondidos
  orderProducts.value = productsText;

  orderTotal.value = totalFormatted;


  // Abre formulário
  checkoutModal.classList.add("active");

});


// Fechar checkout
closeCheckout.addEventListener("click", () => {

  checkoutModal.classList.remove("active");

});


// Fechar clicando fora
checkoutModal.addEventListener("click", event => {

  if (event.target === checkoutModal) {

    checkoutModal.classList.remove("active");

  }

});


// ================================
// ENVIAR PEDIDO
// ================================

checkoutForm.addEventListener("submit", async event => {

  event.preventDefault();


  if (cartProducts.length === 0) {

    alert("Seu carrinho está vazio.");

    return;
  }


  const submitButton =
    checkoutForm.querySelector(
      ".checkout-submit"
    );


  submitButton.disabled = true;

  submitButton.textContent =
    "Enviando pedido...";


  checkoutStatus.textContent = "";


  // FormSubmit AJAX
  const formData =
    new FormData(checkoutForm);


  try {

    const response = await fetch(
      "https://formsubmit.co/ajax/sylvain.chrisnalda@escola.pr.gov.br",
      {
        method: "POST",

        headers: {
          "Accept": "application/json"
        },

        body: formData
      }
    );


    const result = await response.json();


    if (!response.ok) {

      throw new Error(
        result.message ||
        "Não foi possível enviar o pedido."
      );

    }


    // SUCESSO
    checkoutStatus.textContent =
      "Pedido enviado com sucesso! Obrigado pela compra. 🎉";

    checkoutStatus.classList.add("success");


    alert(
      "Pedido enviado com sucesso! 🎉\n\n" +
      "Você receberá a confirmação por e-mail."
    );


    // Limpa carrinho
    cartProducts = [];

    updateCart();


    // Limpa formulário
    checkoutForm.reset();


    // Fecha checkout
    setTimeout(() => {

      checkoutModal.classList.remove("active");

      checkoutStatus.textContent = "";

      checkoutStatus.classList.remove("success");

    }, 1800);


  } catch (error) {

    console.error(error);


    checkoutStatus.textContent =
      "Não foi possível enviar o pedido. Tente novamente.";

    checkoutStatus.classList.add("error");


  } finally {

    submitButton.disabled = false;

    submitButton.textContent =
      "Enviar pedido";

  }

});



// ================================
// FAVORITOS
// ================================

document.querySelectorAll(".favorite").forEach(button => {

  button.addEventListener("click", () => {

    button.classList.toggle("active");

    button.textContent =
      button.classList.contains("active")
        ? "♥"
        : "♡";

  });

});


// ================================
// BUSCA
// ================================

const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");


searchBtn.addEventListener("click", () => {

  searchModal.classList.add("active");

  setTimeout(() => {
    searchInput.focus();
  }, 100);

});


closeSearch.addEventListener("click", () => {
  searchModal.classList.remove("active");
});


searchModal.addEventListener("click", event => {

  if (event.target === searchModal) {
    searchModal.classList.remove("active");
  }

});


searchInput.addEventListener("input", () => {

  const query = searchInput.value.toLowerCase().trim();


  if (!query) {

    searchResult.textContent = "";

    return;
  }


  const products = [
    "Jaqueta Flow",
    "Calça Move",
    "Overshirt Urban"
  ];


  const results = products.filter(product =>
    product.toLowerCase().includes(query)
  );


  if (results.length === 0) {

    searchResult.textContent =
      "Nenhuma peça encontrada.";

    return;
  }


  searchResult.innerHTML = `
    <strong>Encontramos:</strong>
    ${results.join(", ")}
  `;

});


// ================================
// NEWSLETTER
// ================================

const newsletterForm =
  document.getElementById("newsletterForm");


newsletterForm.addEventListener("submit", event => {

  event.preventDefault();


  const email =
    document.getElementById("email").value;


  if (!email) return;


  alert(
    "Obrigado! Seu e-mail foi cadastrado."
  );


  newsletterForm.reset();

});


// ================================
// BOTÃO VER MAIS
// ================================

const loadMore =
  document.getElementById("loadMore");


loadMore.addEventListener("click", () => {

  loadMore.textContent = "Em breve...";


  setTimeout(() => {

    loadMore.textContent = "Ver mais peças";

  }, 1800);

});


// ================================
// ESC - FECHAR JANELAS
// ================================

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    searchModal.classList.remove("active");

    closeCartPanel();

  }

});


// ================================
// INICIALIZAÇÃO
// ================================

updateCart();
