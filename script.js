// ================================
// MENU MOBILE
// ================================

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}


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

let cartProducts = [];


// ================================
// ABRIR CARRINHO
// ================================

function openCart() {
  cart.classList.add("active");
  overlay.classList.add("active");
}


// ================================
// FECHAR CARRINHO
// ================================

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


  // CARRINHO VAZIO

  if (cartProducts.length === 0) {

    cartItems.innerHTML = `
      <p class="empty-cart">
        Seu carrinho está vazio.
      </p>
    `;

    cartTotal.textContent = "R$ 0,00";

    return;
  }


  // LIMPAR CARRINHO

  cartItems.innerHTML = "";


  // MOSTRAR PRODUTOS

  cartProducts.forEach((item, index) => {

    const element = document.createElement("div");

    element.className = "cart-item";

    element.innerHTML = `
      <div>
        <h4>${item.product}</h4>

        <span>
          ${formatCurrency(item.price)}
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


  // CALCULAR TOTAL

  const total = cartProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );


  cartTotal.textContent = formatCurrency(total);


  // REMOVER PRODUTO

  document.querySelectorAll(".remove-item").forEach(button => {

    button.addEventListener("click", () => {

      const index = Number(button.dataset.index);

      cartProducts.splice(index, 1);

      updateCart();

    });

  });

}


// ================================
// FORMATAR MOEDA
// ================================

function formatCurrency(value) {

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


// ================================
// CHECKOUT
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


// ================================
// ABRIR CHECKOUT
// ================================

checkoutButton.addEventListener("click", () => {

  // Verifica se há produtos

  if (cartProducts.length === 0) {

    alert(
      "Seu carrinho está vazio. Adicione uma peça antes de finalizar."
    );

    return;
  }


  // PRODUTOS

  const productsText = cartProducts
    .map((item, index) => {

      return `${index + 1}. ${item.product} — ${formatCurrency(item.price)}`;

    })
    .join("\n");


  // TOTAL

  const total = cartProducts.reduce(
    (sum, item) => sum + item.price,
    0
  );


  // Preencher campos escondidos

  orderProducts.value = productsText;

  orderTotal.value = formatCurrency(total);


  // Limpar mensagens anteriores

  checkoutStatus.textContent = "";

  checkoutStatus.classList.remove(
    "success",
    "error"
  );


  // Fechar carrinho

  closeCartPanel();


  // Abrir checkout

  checkoutModal.classList.add("active");

});


// ================================
// FECHAR CHECKOUT
// ================================

closeCheckout.addEventListener("click", () => {

  checkoutModal.classList.remove("active");

});


// ================================
// FECHAR CLICANDO FORA
// ================================

checkoutModal.addEventListener("click", event => {

  if (event.target === checkoutModal) {

    checkoutModal.classList.remove("active");

  }

});


// ================================
// ENVIAR PEDIDO POR E-MAIL
// ================================

checkoutForm.addEventListener(
  "submit",
  async event => {

    event.preventDefault();


    // Verificar carrinho

    if (cartProducts.length === 0) {

      alert("Seu carrinho está vazio.");

      return;
    }


    // Botão

    const submitButton =
      checkoutForm.querySelector(
        ".checkout-submit"
      );


    submitButton.disabled = true;

    submitButton.textContent =
      "Enviando pedido...";


    checkoutStatus.textContent = "";

    checkoutStatus.classList.remove(
      "success",
      "error"
    );


    // Atualizar produtos antes do envio

    const productsText = cartProducts
      .map((item, index) => {

        return `${index + 1}. ${item.product} — ${formatCurrency(item.price)}`;

      })
      .join("\n");


    const total = cartProducts.reduce(
      (sum, item) => sum + item.price,
      0
    );


    orderProducts.value = productsText;

    orderTotal.value = formatCurrency(total);


    // Criar dados do formulário

    const formData =
      new FormData(checkoutForm);


    try {

      const response = await fetch(
        "https://formsubmit.co/ajax/sylvain.chrisnalda@escola.pr.gov.br",
        {
          method: "POST",

          headers: {
            Accept: "application/json"
          },

          body: formData
        }
      );


      const result =
        await response.json();


      // Verificar resposta

      if (!response.ok) {

        throw new Error(
          result.message ||
          "Não foi possível enviar o pedido."
        );

      }


      // ================================
      // SUCESSO
      // ================================

      checkoutStatus.textContent =
        "Pedido enviado com sucesso! 🎉";

      checkoutStatus.classList.add(
        "success"
      );


      alert(
        "Pedido enviado com sucesso! 🎉\n\n" +
        "O pedido foi encaminhado para a VIVA."
      );


      // Limpar carrinho

      cartProducts = [];

      updateCart();


      // Limpar formulário

      checkoutForm.reset();


      // Fechar checkout

      setTimeout(() => {

        checkoutModal.classList.remove(
          "active"
        );

        checkoutStatus.textContent = "";

        checkoutStatus.classList.remove(
          "success"
        );

      }, 1800);


    } catch (error) {

      console.error(
        "Erro ao enviar pedido:",
        error
      );


      checkoutStatus.textContent =
        "Não foi possível enviar o pedido. Verifique sua conexão e tente novamente.";

      checkoutStatus.classList.add(
        "error"
      );


    } finally {

      submitButton.disabled = false;

      submitButton.textContent =
        "Enviar pedido";

    }

  }
);


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

const searchBtn =
  document.getElementById("searchBtn");

const searchModal =
  document.getElementById("searchModal");

const closeSearch =
  document.getElementById("closeSearch");

const searchInput =
  document.getElementById("searchInput");

const searchResult =
  document.getElementById("searchResult");


searchBtn.addEventListener("click", () => {

  searchModal.classList.add("active");

  setTimeout(() => {

    searchInput.focus();

  }, 100);

});


closeSearch.addEventListener("click", () => {

  searchModal.classList.remove("active");

});


searchModal.addEventListener(
  "click",
  event => {

    if (event.target === searchModal) {

      searchModal.classList.remove(
        "active"
      );

    }

  }
);


searchInput.addEventListener(
  "input",
  () => {

    const query =
      searchInput.value
        .toLowerCase()
        .trim();


    if (!query) {

      searchResult.textContent = "";

      return;
    }


    const products = [
      "Jaqueta Flow",
      "Calça Move",
      "Overshirt Urban"
    ];


    const results =
      products.filter(product =>
        product
          .toLowerCase()
          .includes(query)
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

  }
);


// ================================
// NEWSLETTER
// ================================

const newsletterForm =
  document.getElementById(
    "newsletterForm"
  );


newsletterForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();


    const email =
      document.getElementById(
        "email"
      ).value;


    if (!email) return;


    alert(
      "Obrigado! Seu e-mail foi cadastrado."
    );


    newsletterForm.reset();

  }
);


// ================================
// BOTÃO VER MAIS
// ================================

const loadMore =
  document.getElementById("loadMore");


loadMore.addEventListener(
  "click",
  () => {

    loadMore.textContent =
      "Em breve...";


    setTimeout(() => {

      loadMore.textContent =
        "Ver mais peças";

    }, 1800);

  }
);


// ================================
// ESC
// ================================

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      searchModal.classList.remove(
        "active"
      );

      closeCartPanel();

      checkoutModal.classList.remove(
        "active"
      );

    }

  }
);


// ================================
// INICIALIZAÇÃO
// ================================

updateCart();
