class Cart{
  cartItems=undefined;
  localStorageKey=undefined;
    
  loadFromStorage(){
    this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey));
   
    if(!this.cartItems){
     this.cartItems=[{
       productId:'d2785924-743d-49b3-8f03-ec258e640503',
       quantity:1,
       deliveryOptionId:'1',
       },
       {
       productId: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
       quantity:1,
       deliveryOptionId:'1'
       }];
     }
    }
    saveStorage(){
      localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
    }    
    /*addToCart(productId){
      let matchingItem;
       this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem=cartItem;
        }
       });
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({ productId: productId, quantity: 1,deliveryOptionId:'1' });
      }
      this.saveStorage();
      renderCart();
    }*/



      addToCart(productId) {
        let matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({ productId: productId, quantity: 1, deliveryOptionId: '1' });
        }
        this.saveStorage();
    }
    

    removeItem(productId){
      const newCart=[];
  
     this.cartItems.forEach((cartItem) =>{
       if(cartItem.productId!==productId){
             newCart.push(cartItem);
       }
      });
         this.cartItems= newCart;
         this.saveStorage();
         renderCart();
  }


  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
     if(productId === cartItem.productId){
       matchingItem=cartItem;
     }
      });
      matchingItem.deliveryOptionId=deliveryOptionId;
      this.saveStorage();
  }
}

const cart=new Cart();
const businessCart=new Cart();

cart.localStorageKey='cart-oop';
businessCart.localStorageKey='cart-business';

cart.loadFromStorage();
businessCart.loadFromStorage();
