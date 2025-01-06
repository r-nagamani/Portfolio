import {cart} from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { addOrder } from '../data/orders.js';

export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents=0;


   cart.cartItems.forEach((cartItem)=>{
    const product=getProduct(cartItem.productId);
    productPriceCents+=product.priceCents*cartItem.quantity;
    const deliveryOption= getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents+= deliveryOption.priceCents;
   });
   
   const totalBeforeTaxCents= productPriceCents + shippingPriceCents;
   const taxCents= totalBeforeTaxCents * 0.1;
   const totalCents=totalBeforeTaxCents + taxCents;

 const paymentSummaryHTML=`
 
 <div class="payment-summary-title">
            Order Summary
          </div>
          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(Math.round(productPriceCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(Math.round(shippingPriceCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(Math.round(totalBeforeTaxCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(Math.round(taxCents)/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(Math.round(totalCents)/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
 `;
      
    document.querySelector('.js-payment-summary')
     .innerHTML=paymentSummaryHTML;

     document.querySelector('.js-place-order')
      .addEventListener('click',()=>{
        const order = {
          items: cart.cartItems,
          totalCents: totalCents
        };
        addOrder(order);
        document.querySelector('.js-place-order').textContent='Order Placed';  
        renderCartItems();
        renderPaymentSummary();         
      });     
}

function renderCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items-container');
  cartItemsContainer.innerHTML = ''; // Clear existing items
  cart.cartItems.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    const cartItemHTML = `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div>${product.name}</div>
        <div>$${(product.priceCents / 100).toFixed(2)}</div>
        <div>${cartItem.quantity}</div>
        <div>$${(deliveryOption.priceCents / 100).toFixed(2)}</div>
      </div>
    `;

    cartItemsContainer.innerHTML += cartItemHTML;
  });
}

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);

    // Re-render cart and payment summary after updating delivery option
    renderCartItems();
    renderPaymentSummary();
  });
});