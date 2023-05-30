  
  
  // Função para carregar as informações do pedido do localStorage
  function loadOrderFromLocalStorage() {
    const order = JSON.parse(localStorage.getItem('order'));
  
    if (order) {
      // Preencha os detalhes do cliente
      const clientDetails = document.getElementById('client-details');
      clientDetails.innerHTML = `
        <h3>Detalhes do Cliente</h3>
        <p><strong>Nome:</strong> ${order.clientName}</p>
        <p><strong>Telefone:</strong> ${order.clientPhone}</p>
        <p><strong>Endereço:</strong> ${order.clientAddress}</p>
        <p><strong>Complemento:</strong> ${order.clientComplement}</p>
        <p><strong>Ponto de Referência:</strong> ${order.clientLandmark}</p>
        <p><strong>CEP:</strong> ${order.clientCEP}</p>
      `;
  
      // Preencha os detalhes do pagamento
     const paymentDetails = document.getElementById('payment-details');
     paymentDetails.innerHTML = `
     <h4>Detalhes do Pagamento</h4>
     <p><strong>Opção de Pagamento:</strong> ${order.clientPayment}</p>
      `;
  
      // Preencha os itens do carrinho
      const cartItems = document.getElementById('cart-items');
      cartItems.innerHTML = `
        <h3>Itens do Carrinho</h3>
        ${order.clientCart}
      `;
  
      // Preencha o total do pedido
     const orderTotalAmount = document.getElementById('order-total-amount');
     orderTotalAmount.textContent = `${order.clientTotal}`;
    }
  }
  
  // Carregue as informações do pedido ao carregar a página
  window.addEventListener('DOMContentLoaded', loadOrderFromLocalStorage);


  //função de enviar link de whatsapp
  function createWhatsAppLink() {
    // Obtenha as informações do "order-summary"
    const clientName = document.getElementById('client-name').textContent;
    const clientPhone = document.getElementById('client-phone').textContent;
    const clientAddress = document.getElementById('client-address').textContent;
    const clientComplement = document.getElementById('client-complement').textContent;
    const clientLandmark = document.getElementById('client-landmark').textContent;
    const clientCEP = document.getElementById('client-cep').textContent;
    const clientPayment = document.getElementById('client-payment').textContent;
    const clientCart = document.getElementById('client-cart').textContent;
    const orderTotalAmount = document.getElementById('order-total-amount').textContent;
  
    // Formate as informações para a URL do WhatsApp
    const formattedClientName = encodeURIComponent(`Nome: ${clientName}`);
    const formattedClientPhone = encodeURIComponent(`Telefone: ${clientPhone}`);
    const formattedClientAddress = encodeURIComponent(`Endereço: ${clientAddress}`);
    const formattedClientComplement = encodeURIComponent(`Complemento: ${clientComplement}`);
    const formattedClientLandmark = encodeURIComponent(`Ponto de Referência: ${clientLandmark}`);
    const formattedClientCEP = encodeURIComponent(`CEP: ${clientCEP}`);
    const formattedClientPayment = encodeURIComponent(`Opção de Pagamento: ${clientPayment}`);
    const formattedClientCart = encodeURIComponent(`Itens do Carrinho\n${clientCart}`);
    const formattedOrderTotalAmount = encodeURIComponent(`Total do Pedido: ${orderTotalAmount}`);
  
    // Crie o link do WhatsApp com as informações formatadas
    const whatsappLink = `https://wa.me/5521993396446?text=${formattedClientName}+${formattedClientPhone}+${formattedClientAddress}+${formattedClientComplement}+${formattedClientLandmark}+${formattedClientCEP}+${formattedClientPayment}+${formattedClientCart}+${formattedOrderTotalAmount}`;
  
    return whatsappLink;
  }


document.addEventListener('DOMContentLoaded', () => {
    const confirmOrderButton = document.getElementById('confirm-order');
    const whatsappLink = document.getElementById('whatsapp-link');
  
    confirmOrderButton.addEventListener('click', () => {
      const orderSummary = document.getElementById('order-summary').textContent;
      const encodedMessage = encodeURIComponent(orderSummary);
      const phoneNumber = '5521993396446'; // Substitua pelo número de telefone desejado
  
      whatsappLink.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      whatsappLink.click(); // Ativa automaticamente o link do WhatsApp ao clicar no botão
    });
  });