const mobileMenuButtonElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');

function toggleMobileMenu(){
    mobileMenuElement.classList.toggle('open')  // add if does not exist and remove if already existed
}

mobileMenuButtonElement.addEventListener('click',toggleMobileMenu);