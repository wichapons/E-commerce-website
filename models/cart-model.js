const Product = require('./products-model');

class Cart {
    constructor(items=[],totalQuantity = 0, totalPrice=0){ //if no value on the cart before use the default value
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product){ //product data from findID in mongoDB
        const cartItem ={
            product:product, 
            quantity:1,
            totalPrice: product.price
        }
        //checking if user add the same product to the cart. This will only increase the quantity of that product.
        for (let i=0;i<this.items.length;i++){ //loop in items in the cart
            const item = this.items[i];
            if(item.product.id === product.id){ // if found the existing product increase the amount.
                cartItem.quantity = parseInt(item.quantity) +1;
                cartItem.totalPrice = item.totalPrice + item.product.price;
                this.items[i] = cartItem;
                this.totalQuantity++
                this.totalPrice = this.totalPrice+ item.product.price
                return;
            }  
        }
        //after finished the for-loop add cartItem in to items
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice = this.totalPrice + product.price; 
        return;
    }

    updateItem(productID,newQuantity){
        for (let i=0;i<this.items.length;i++){
            const item = this.items[i];
            if(item.product.id === productID && newQuantity>0){
                const cartItem = {...item} //creates a shallow copy of the item object and assigns it to cartItem. This means that any modifications made to cartItem will not affect the original item object. in general it's risky to modify objects (working with references instead of copies) which might have undesired effects in other places of the app.
                cartItem.quantity = newQuantity;
                cartItem.totalPrice = newQuantity * item.product.price;
                this.items[i] = cartItem;
                const quantityChange = newQuantity - item.quantity; // return positive if increase otherwise decrease
                this.totalQuantity = this.totalQuantity + quantityChange ;
                this.totalPrice = this.totalPrice + (quantityChange * item.product.price);
                return {updatedItemPrice: cartItem.totalPrice};  //return update total price of that item (NOT ALL ITEM!!!)
            }  else if(item.product.id === productID && newQuantity<=0){ //if user input quantity<0 delete that item
                this.items.splice(i,1);
                this.totalQuantity = this.totalQuantity - item.quantity;
                this.totalPrice = this.totalPrice - item.totalPrice;
                return {updatedItemPrice: 0};
            }
        }
    }

    async updatePrices() {
        const productIds = this.items.map(function (item) {
          return item.product.id;
        });
        const products = await Product.findMultiple(productIds);
        const deletableCartItemProductIds = [];

        //find product id in the cart 
        for (const cartItem of this.items) {
          const product = products.find(function (prod) { 
            return prod.id === cartItem.product.id;
          });
          if (!product) {
            // product was deleted!
            // "schedule" for removal from cart
            deletableCartItemProductIds.push(cartItem.product.id);
            continue; //continue for loop without exucute the code below
          }
          // product was not deleted
          // set product data and total price to latest price from database
          cartItem.product = product;
          cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
        }

        //remove item that match with deletableCartItemProductIds for the cart
        if (deletableCartItemProductIds.length > 0) { 
          this.items = this.items.filter(function (item) {
            return deletableCartItemProductIds.indexOf(item.product.id) < 0; //check index number of that product id in array. If deletableCartItemProductIds.indexOf(item.product.id) return -1 mean not found if return 1 it will filter out
          });
        }
    
        // re-calculate cart totals
        this.totalQuantity = 0;
        this.totalPrice = 0;
    
        for (const item of this.items) {
          this.totalQuantity = this.totalQuantity + item.quantity;
          this.totalPrice = this.totalPrice + item.totalPrice;
        }
      }

}

module.exports = Cart;