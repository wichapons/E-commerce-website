const addToCartButtonElement = document.querySelector('#product-details button');
const cartBadgeElement = document.querySelector('.nav-items .badge');


async function addToCart(){
    console.log('add to cart has been hit');
    const productID = addToCartButtonElement.dataset.productid;
    const csrfToken = addToCartButtonElement.dataset.csrftoken;
    console.log('csrfToken: '+csrfToken);
    let response;
    console.log('add to cart has been hit');
    try{
            response = await fetch('/cart/items',{
            method:'POST',
            body: JSON.stringify({  // to convert the body.object to JSON format
                productID:productID,
                _csrf:csrfToken
            }),
            headers: {
                'Content-Type':'application/json' // to tell the server that data is sent in json format
            }
        });
    } catch(err){
        console.log(err);
        next(err);
    }

    if (!response.ok){
        alert('something went wrong please try again')
    }else{
        const responseData = await response.json(); //get the res.json from cart controller
        const newTotalQuantity = responseData.totalItem; 
        console.log('newTotalQuantity: '+newTotalQuantity);
        cartBadgeElement.textContent = newTotalQuantity; //change number of item in carts 
    }


}

addToCartButtonElement.addEventListener('click',addToCart);