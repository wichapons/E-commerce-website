const deleteProductBtnElements = document.querySelectorAll('.product-btn button')

async function deleteProduct(event){
    const buttonElement = event.target;
    const productId = buttonElement.dataset.productid;  //get the productId from dataset property
    const csrfToken = buttonElement.dataset.csrf;     //get the csrfToken

    const response = await fetch(`/admin/products/${productId}?_csrf=${csrfToken}`,{
        method:'DELETE'
    });

    if(!response.ok){
        alert('error occured, cannot delete this product item');
        return;
    }

    // Get the <li> element containing the deleted product item and remove it from the DOM
    const liElement = buttonElement.closest('li');
    liElement.remove();

}

for (const deleteProductBtnElement of deleteProductBtnElements){
    deleteProductBtnElement.addEventListener('click',deleteProduct)
}
