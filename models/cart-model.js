class Cart {
    constructor(items=[]){
        this.items = items;
    }

    addItem(product){
        const cartItem ={
            product:product,
            quantity:1,
            totalPrice: product.price
        }
        //checking if user add the same product to the cart. This will only increase the quantity of that product.
        for (let i=0;i<this.items.length;i++){
            const item = this.item[i];
            if(item.product.id === product.id){
                cartItem.quantity = cartItem.quantity +1;
                cartItem.totalPrice = cartItem.totalPrice + product.price;
                this.tiems[i] = cartItem;
                return;
            }  
        }
        //after finished the for-loop add cartItem in to items
        this.items.push(cartItem);
    }
}