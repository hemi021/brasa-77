// =====================================================
// MENU MOBILE
// =====================================================

const menuButton =
    document.getElementById("menu-button");

const nav =
    document.getElementById("nav");


if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        nav.classList.toggle("active");

        const icon =
            menuButton.querySelector("i");


        if (nav.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuButton.setAttribute(
                "aria-label",
                "Fechar menu"
            );

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );
        }

    });


    // Fecha o menu ao clicar

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            const icon =
                menuButton.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });

}


// =====================================================
// FILTRO DO CARDÁPIO
// =====================================================

const categoryButtons =
    document.querySelectorAll(".category-btn");

const productCards =
    document.querySelectorAll(".product-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.getAttribute("data-category");


        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        productCards.forEach(card => {

            const cardCategory =
                card.getAttribute("data-category");


            if (
                category === "todos" ||
                cardCategory === category
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// =====================================================
// CARRINHO
// =====================================================

let cart = [];


const cartButton =
    document.getElementById("cart-button");

const cartPanel =
    document.getElementById("cart-panel");

const closeCart =
    document.getElementById("close-cart");

const cartOverlay =
    document.getElementById("cart-overlay");

const cartItems =
    document.getElementById("cart-items");

const cartCount =
    document.getElementById("cart-count");

const cartTotal =
    document.getElementById("cart-total");

const checkoutButton =
    document.getElementById("checkout-button");


// =====================================================
// ABRIR CARRINHO
// =====================================================

function openCart() {

    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");

}


// =====================================================
// FECHAR CARRINHO
// =====================================================

function closeCartPanel() {

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

}


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (closeCart) {

    closeCart.addEventListener(
        "click",
        closeCartPanel
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCartPanel
    );

}


// =====================================================
// ADICIONAR PRODUTO
// =====================================================

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(
                button.getAttribute("data-price")
            );


        const existingProduct =
            cart.find(item =>
                item.name === name
            );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        openCart();

    });

});


// =====================================================
// ATUALIZA CARRINHO
// =====================================================

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "R$ 0,00";

        return;
    }


    let total = 0;
    let quantityTotal = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        quantityTotal += item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "cart-item";


        itemElement.innerHTML = `

            <div class="cart-item-top">

                <h4>
                    ${item.name}
                </h4>

                <span class="cart-item-price">
                    R$ ${itemTotal.toFixed(2).replace(".", ",")}
                </span>

            </div>

            <div class="cart-item-controls">

                <button
                    onclick="changeQuantity(${index}, -1)">
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)">
                    +
                </button>

                <button
                    onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        `;


        cartItems.appendChild(itemElement);

    });


    cartCount.textContent =
        quantityTotal;


    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

}


// =====================================================
// ALTERAR QUANTIDADE
// =====================================================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// =====================================================
// REMOVER PRODUTO
// =====================================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// =====================================================
// FINALIZAR PEDIDO PELO WHATSAPP
// =====================================================

const whatsappNumber =
    "5547999999999";


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Adicione pelo menos um produto ao pedido."
                );

                return;

            }


            let message =
                "Olá! Gostaria de fazer um pedido na BRASA 77.%0A%0A";


            message +=
                "*Meu pedido:*%0A";


            let total = 0;


            cart.forEach(item => {

                const itemTotal =
                    item.price * item.quantity;

                total += itemTotal;


                message +=
                    `• ${item.quantity}x ${item.name} - R$ ${itemTotal.toFixed(2).replace(".", ",")}%0A`;

            });


            message +=
                `%0A*Total: R$ ${total.toFixed(2).replace(".", ",")}*`;


            message +=
                "%0A%0AGostaria de confirmar o pedido.";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${message}`;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

}


// =====================================================
// INICIALIZA
// =====================================================

updateCart();