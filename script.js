//função de pop-up
function showPopup(message) {
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.textContent = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 1500);
}



// Variável global para armazenar os itens do carrinho
let cartItems = [];

// Função para adicionar um item ao carrinho
function addToCart(item) {
  // Verifica se o item já existe no carrinho
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    // Se o item já existe, incrementa a quantidade
    existingItem.quantity++;
  } else {
    // Se o item não existe, adiciona ao carrinho
    cartItems.push({ ...item, quantity: 1 });
  }

  // Exibe o pop-up informando que o item foi adicionado ao carrinho
  showPopup('✔️Item adicionado ao carrinho');

  // Atualiza o carrinho exibindo os itens
  displayCartItems();
}

// Função para remover um item do carrinho
function removeFromCart(itemId) {
  // Filtra os itens do carrinho, removendo o item correspondente ao ID
  cartItems = cartItems.filter((item) => item.id !== itemId);

  // Atualiza o carrinho exibindo os itens
  displayCartItems();
}

// Função para exibir os itens do carrinho no HTML
function displayCartItems() {
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  // Percorre os itens do carrinho e cria o HTML correspondente
  cartItems.forEach((item) => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('cart-item');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;

    const itemName = document.createElement('span');
    itemName.textContent = item.name;

    const itemPrice = document.createElement('span');
    itemPrice.textContent = 'R$ ' + item.price.toFixed(2);

    const itemQuantity = document.createElement('span');
    itemQuantity.textContent = 'Quantidade: ' + item.quantity;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover';
    removeButton.addEventListener('click', () => {
      removeFromCart(item.id);
    });

    cartItemDiv.appendChild(itemImage);
    cartItemDiv.appendChild(itemName);
    cartItemDiv.appendChild(itemPrice);
    cartItemDiv.appendChild(itemQuantity);
    cartItemDiv.appendChild(removeButton);

    cartContainer.appendChild(cartItemDiv);
  });

  // Atualiza o total do carrinho
  updateCartTotal();
}

// Função para atualizar o valor total do carrinho
function updateCartTotal() {
  const cartTotalAmount = document.getElementById('cart-total-amount');
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalAmount.textContent = total.toFixed(2);
}

// Event listener para os botões "Adicionar ao Pedido"
const addToCartButtons = document.querySelectorAll('.addtocart');
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const foodCard = button.parentNode;
    const id = foodCard.id;
    const name = foodCard.querySelector('.headline-food').textContent;
    const price = parseFloat(foodCard.querySelector('.valor').textContent);
    const image = foodCard.querySelector('.tumbnail').src;

    addToCart({ id, name, price, image });
  });
});

// Inicializa o carrinho exibindo os itens
displayCartItems();


// Função para salvar as informações do pedido no localStorage
function saveOrderToLocalStorage(order) {
    localStorage.setItem('order', JSON.stringify(order));
  } 
/*
// Função para salvar as informações do pedido no localStorage
function saveOrderToLocalStorage(order) {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}
*/  
  // Event listener para o botão "Finalizar Compra"
  const checkoutButton = document.getElementById('checkout-btn');
  checkoutButton.addEventListener('click', () => {
    // Crie um objeto para armazenar as informações do pedido
    const order = {
      clientName: document.getElementById('nome').value,
      clientPhone: document.getElementById('phone').value,
      clientAddress: document.getElementById('adress1').value,
      clientComplement: document.getElementById('adress2').value,
      clientLandmark: document.getElementById('ponto').value,
      clientCEP: document.getElementById('cep').value,

      clientCart: document.getElementById('cart-items').innerHTML,
      clientPayment: document.querySelector('input[name="payment"]:checked').value,
      clientTotal: document.getElementById('cart-total-amount').textContent,
      
      
      // Aqui você pode adicionar mais propriedades conforme necessário
    };
  
    // Salve as informações do pedido no localStorage
    saveOrderToLocalStorage(order);
  
    // Redirecione para a página de confirmação de pedido
    window.location.href = 'ordersale.html';
  });