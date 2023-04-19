const { response } = require("express");

const cartItemUpdateFormElements = document.querySelectorAll('.cart-item-management');

async function updateCartItem(event){
    event.preventDefault();
    const form = event.target;
    const productID = form.dataset.productid;
    const csrfToken = form.dataset.csrftoken;
    const quantity = form.querySelector('input[type="number"]').value;

    try{
        const response = await fetch('/cart/item',{
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
    }catch(err){
        alert('something went wrong')
        console.log(err);
        return;
    }
    if (!response.ok){
        alert('something went wrong')
        console.log(err);
        return;
    }else{
        const responseData = await response.json();
    }


    
}


for (const FormElement of cartItemUpdateFormElements){
    FormElement.addEventListener('submit',updateCartItem)
}