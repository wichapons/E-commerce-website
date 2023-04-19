class Cart {
    constructor(items=[],totalQuantity = 0, totalPrice=0){
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }

    addItem(product){
        const cartItem ={
            product:product,
            quantity:1,
            totalPrice: product.price
        }
        //checking if user add the same product to the cart. This will only increase the quantity of that product.
        for (let i=0;i<this.items.length;i++){
            const item = this.items[i];
            if(item.product.id === product.id){
                cartItem.quantity = cartItem.quantity +1;
                cartItem.totalPrice = cartItem.totalPrice + product.price;
                this.items[i] = cartItem;
                this.totalQuantity++
                this.totalPrice = this.totalPrice+product.price
                return;
            }  
        }
        //after finished the for-loop add cartItem in to items
        this.items.push(cartItem);
        this.totalQuantity++;
        this.totalPrice = this.totalPrice + product.price;
    }
}

module.exports = Cart;