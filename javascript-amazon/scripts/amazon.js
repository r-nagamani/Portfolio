const products=[{
   image:'images/products/women-chunky-beanie-gray.webp',
   name:'Women\'s Chunky Cable Beanie - Gray',
   rating:{
    stars:5,
    count:300
   },
   priceCents:2000
}, 
{

  image:'images/products/vanity-mirror-silver.jpg',
  name:'Vanity Mirror with Heavy Base - Chrome',
  rating:{
    stars:4.5,
    count:180
  },
 priceCents:1599

},
{
  image:'images/products/coffeemaker-with-glass-carafe-black.jpg',
  name:'Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black',
  rating:{
      stars:3.5,
      count:190
  },
  priceCents:2000
},{
  image:'images/products/floral-mixing-bowl-set.jpg',
  name:'10-Piece Mixing Bowl Set with Lids - Floral',
  rating:{
     stars:4.5,
     count:150
  },
  priceCents:1999
},{
  image:'images/products/straw-sunhat.webp',
  name:'Straw Lifeguard Sun Hat',
  rating:{
     stars:5,
     count:180
  },
  priceCents:999
},
  {
  image:'images/products/athletic-cotton-socks-6-pairs.jpg',
  name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating:{
    stars:4,
    count:87,
  },
  priceCents:1000,
},
{
image:'images/products/intermediate-composite-basketball.jpg',
name: 'Intermediate Size Basketball',
rating:{
  stars:4.5,
  count:150,
},
priceCents:2080,

},
{
  image:'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name:'Adults Plain Cotton T-Shirt - 2 Pack',
  rating:{
    stars:4,
    count:56,
  },
  priceCents:799,
},{
 image:'images/products/black-2-slot-toaster.jpg',
 name:'2 Slot Toaster - Black',
 rating:{
  stars:5,
  count:2197,
 },
priceCents:1689
},
{
 image:'images/products/round-sunglasses-black.jpg',
 name:'Round Sunglasses',
 rating:{
   stars:4,
   count:50
 },
 priceCents:1350
},
{
 image:'images/products/men-slim-fit-summer-shorts-gray.jpg',
 name: 'Men\'s Slim-Fit Summer Shorts',
 rating:{
  stars:5,
  count:280,
 },
 priceCents:1099,
 keywords: [
  "socks",
  "sports",
  "apparel"
],
},{
 image:'images/products/blackout-curtain-set-beige.webp',
 name:'Blackout Curtains Set 4-Pack - Beige',
 rating:{
  stars:4,
  count:150
 },
 priceCents:3050,
}];

let productHtml='';
products.forEach((product)=>{

productHtml+=` 
         <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-name=
          "${product.name}">
            Add to Cart
          </button>
        </div>

`
});
document.querySelector('.js-products-grid').innerHTML=productHtml;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
   button.addEventListener('click',() => {
    const productName=button.dataset.productName;
    
    let matchingItem;
    cart.forEach((item)=>{
    if(productName ===item.productName)
    {
      matchingItem=item;
    }
    });
    if(matchingItem){
      matchingItem.quantity+=1;
    }else{

    cart.push({
     productName:productName,
     quantity:1
    });
  }

    let cartQuantity=0;
   
    cart.forEach((item)=>{
        cartQuantity+=item.quantity;
           
    });
    document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
   });
    
  });