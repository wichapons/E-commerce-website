const uploadedImageInputElement = document.querySelector('#uploaded-image input');
const uploadedImagePreviewElement = document.querySelector('#uploaded-image img');

function updateImagePreview(){
    const files = uploadedImageInputElement.files; //access the file property
    if(!files|| files.length ===0){
        uploadedImagePreviewElement.style.display = 'none'
        return;
    }
    const inputFile = files[0];

    //create client side URL for accessing preview image using built-in module in JS
    previewImageOnClientSide = URL.createObjectURL(inputFile);
    //set src = image URL
    uploadedImagePreviewElement.src = previewImageOnClientSide;
    uploadedImagePreviewElement.style.display = 'block';
}

uploadedImageInputElement.addEventListener('change',updateImagePreview);