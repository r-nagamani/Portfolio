import {cart,removeItem,updateDeliveryOption} from '../data/cart.js';
import {products,getProduct} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions,getDeliveryOption } from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import '../data/cart-class.js';

const today=dayjs();



function renderOrderSummary(){
    let cartSummaryHTML='';

    cart.cartItems.forEach((cartItem)=>{
      const productId=cartItem.productId;

      const matchingProduct=getProduct(productId);

    const deliveryOptionId=cartItem.deliveryOptionId;

    const deliveryOption=getDeliveryOption(deliveryOptionId);
    

    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');

 
 cartSummaryHTML+=`
<div class="cart-item-container 
              js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                 $ ${(matchingProduct.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                 
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                   ${deliveryOptionsHTML(matchingProduct,cartItem)}
                </div> 
            </div>
          </div>  
`;
  
});
function deliveryOptionsHTML(matchingProduct,cartItem){
    let html='';
   deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');

    const priceString=deliveryOption.priceCents===0?'Free':`$${(deliveryOption.priceCents/100).toFixed(2)}-`;

    const isChecked= deliveryOption.id===cartItem.deliveryOptionId;
      html+=`
                  <div class="delivery-option js-delivery-option" 
                  data-product-id="${matchingProduct.id}"
                  data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                    ${isChecked?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`  
   });
      return html;
}
document.querySelector('.js-order-summary')
  .innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
     .forEach((link)=>{
       link.addEventListener('click',()=>{
        const productId=link.dataset.productId;
        removeItem(productId);

       const container= document.querySelector(`.js-cart-item-container-${productId}`);
         container.remove();
         renderPaymentSummary();
       });      
     });

     document.querySelectorAll('.js-delivery-option')
         .forEach((element)=>{
          element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
             updateDeliveryOption(productId,deliveryOptionId);
             renderOrderSummary();
             renderPaymentSummary();


             const container = document.querySelector(`.js-cart-item-container-${productId}`);
      const updatedDeliveryOptionsHTML = deliveryOptionsHTML(getProduct(productId), cart.cartItems.find(item => item.productId === productId));
      container.querySelector('.delivery-options').innerHTML = updatedDeliveryOptionsHTML;
          });
     });
    }

    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = '';
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${(deliveryOption.priceCents / 100).toFixed(2)}-`;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
        html += `
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
          </div>`;
      });
      return html;
    }
    renderOrderSummary();
    renderPaymentSummary();