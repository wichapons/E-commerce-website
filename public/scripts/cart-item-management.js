const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');

async function updateCartItem(event){
    event.preventDefault();
    const form = event.target;
    const productID = form.dataset.productid;
    const csrfToken = form.dataset.csrftoken;
    const quantity = form.querySelector('input[type="number"]').value;
    let response;
    try{
            response = await fetch('/cart/items',{
            method:'PATCH',
            body:JSON.stringify({
                productID:productID,
                quantity:quantity,
                _csrf:csrfToken
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
    }catch(response){
        alert('something went wrong')
        console.log(response);
        return;
    }
    if (!response.ok){
        alert('something went wrong')
        console.log(response);
        return;
    }else{
        
        const responseData = await response.json(); // get the return from ajax req which is total price of that item
        console.log('fetch successfully, data:');
        console.log(responseData);
        
        //total price of that item
        const cartItemTotalPriceElement = document.querySelector('.cart-item .cart-item-total-price') 
        cartItemTotalPriceElement.textContent = responseData.updateCartData.updatedItemPrice.toFixed(2);
        // total price of all item
        const cartAllItemTotalPriceElement = document.querySelector('#cart-total .cart-total-price'); 
        cartAllItemTotalPriceElement.textContent = responseData.updateCartData.newtotalPrice.toFixed(2);
        // total quantity at badge  
        const cartBadgeElement = document.querySelector('.nav-items .badge');
        cartBadgeElement.textContent = responseData.updateCartData.newTotalQuantity;
    }  
}


for (const FormElement of cartItemUpdateFormElements){
    FormElement.addEventListener('submit',updateCartItem)
}