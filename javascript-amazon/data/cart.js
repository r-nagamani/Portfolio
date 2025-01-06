
export let cart;
loadFromStorage();

export function loadFromStorage(){
 cart=JSON.parse(localStorage.getItem('cart'))||{cartItems:[]};

/* if(!cart.cartItems.length){
  cart.cartItems=[{
    productId:'d2785924-743d-49b3-8f03-ec258e640503',
    quantity:1,
    deliveryOptionId:'1',
    },
    {
    productId: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    quantity:1,
    deliveryOptionId:'1'
    },{
      productId:"54e0eccd-8f36-462b-b68a-8182611d9add",
      quantity:2,
      deliveryOptionId:'1'
    },{
      productId:"3ebe75dc-64d2-4137-8860-1f5a963e534b",
      quantity:1,
      deliveryOptionId:'1'
    },
    {
      productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity:1,
      deliveryOptionId:'1'
    },];
  }*/
 }

function saveStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
/*export function addToCart(productId){
  let matchingItem;
   cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem=cartItem;
    }
   });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({ productId: productId, quantity: 1,deliveryOptionId:'1' });
  }
  saveStorage();
}*/


export function addToCart(productId) {
  let matchingItem = cart.cartItems.find(cartItem => cartItem.productId === productId);

  if (matchingItem) {
      matchingItem.quantity += 1;
  } else {
      cart.cartItems.push({ productId, quantity: 1, deliveryOptionId: '1' });
  }
  saveStorage();
}


export function removeItem(productId){
    /*const newCart=[];


    cart.forEach((cartItem) =>{
     if(cartItem.productId!==productId){
           newCart.push(cartItem);
     }
    });
       cart= newCart;
       saveStorage();*/


       cart.cartItems = cart.cartItems.filter((cartItem) => cartItem.productId !== productId);
  saveStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){
 /* let matchingItem;
  cart.forEach((cartItem) => {
   if(productId === cartItem.productId){
     matchingItem=cartItem;
   }
    });
    matchingItem.deliveryOptionId=deliveryOptionId;
    saveStorage();
*/
let matchingItem = cart.cartItems.find(cartItem => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveStorage();
  }




}