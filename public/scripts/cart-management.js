const addToCartButtonElement = document.querySelector('#product-details button');

async function addToCart(){
    const productID = addToCartButtonElement.dataset.productID;
    await fetch('/cart/items',{
        method:'POST',
        body: JSON.stringify({  // to convert the body.object to JSON format
            productID:productID
        }),
        headers: {
            'Content-Type':'application/json' // to tell the server that data is sent in json format
        }
    });
}

addEventListener('click',addToCart)