// MENU MOBILE

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

menuButton.addEventListener("click", function () {
    menu.classList.toggle("active");
});


// MODO ESCURO

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }

});


// FORMULÁRIO

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (
        name.trim() === "" ||
        email.trim() === "" ||
        message.trim() === ""
    ) {
        formMessage.textContent =
            "Preencha todos os campos.";

        formMessage.style.color = "red";

        return;
    }

    formMessage.textContent =
        `Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`;

    formMessage.style.color = "green";

    form.reset();

});
