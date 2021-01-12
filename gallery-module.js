import imagesArray from './gallery-items.js';

let refs = {
    imagesList: document.querySelector(".js-gallery"),
    modalImg: document.querySelector(".lightbox__image"),
    modalHeadElement: document.querySelector(".js-lightbox"),
    closeModalBtn: document.querySelector("button[data-action='close-lightbox']"),
    overlayCloseBtn: document.querySelector(".lightbox__overlay"),

}
const imgArrLength = imagesArray.length;
let galleryItem;
let galleryLink;
let galleryImg;


imagesArray.map(function(currentItem, index){

    //create elements tags and added class
    galleryItem = document.createElement('li');
    galleryItem.classList.add("gallery__item");

    galleryLink = document.createElement('a');
    galleryLink.classList.add("gallery__link");

    galleryImg = document.createElement('img');
    galleryImg.classList.add("gallery__image");

    //set attributes for elements
    galleryImg.setAttribute('src', currentItem.preview);
    galleryImg.setAttribute('data-source', currentItem.original);
    galleryImg.setAttribute('alt', currentItem.description);
    galleryImg.setAttribute('data-index', index);

    // added elemets to DOM Html
    refs.imagesList.appendChild(galleryItem);
    galleryItem.appendChild(galleryLink);
    galleryLink.appendChild(galleryImg);

});
 
// add event listener for all photos on click for open modal window 
// add alt and src atributes
// fn open-modal
const openModalFn = (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    };
    const imageRef = event.target;
    const largeImgURL = imageRef.dataset.source;
    console.log(largeImgURL)
    refs.modalImg.src = largeImgURL;
    refs.modalImg.alt = imageRef.alt;
    refs.modalImg.dataset.index = imageRef.dataset.index;
    refs.modalHeadElement.classList.add('is-open');
};

refs.imagesList.addEventListener('click', openModalFn);

// add event listener for close-modal button + fn close-modal
const closeModalEscFn = (event) => {
    if (event.key !== 'Escape') {
        return;
    };
    refs.modalHeadElement.classList.remove('is-open');
    refs.modalImg.src = '';
    refs.modalImg.alt = '';
    refs.modalImg.dataset.index = '';

};
const closeModalFn = (event) => {
    refs.modalHeadElement.classList.remove('is-open');
    refs.modalImg.src = '';
    refs.modalImg.alt = '';
    refs.modalImg.dataset.index = '';
};

refs.closeModalBtn.addEventListener('click', closeModalFn);

//add close modal for click on overlay
refs.overlayCloseBtn.addEventListener('click', closeModalFn);

// add close for press ESC

window.addEventListener('keydown', closeModalEscFn);

// add next and previous img for press LEFT and RIGHT
//ArrowLeft
//ArrowRight
const arrowSlide = (e) => {
    if (refs.modalHeadElement.classList.contains('is-open')) {
        const refModalIndexData = refs.modalImg.dataset.index;
        if (e.key == 'ArrowLeft' && refModalIndexData != 0) {
            refs.modalImg.src = imagesArray[refModalIndexData - 1].original;
            refs.modalImg.alt = imagesArray[refModalIndexData - 1].description;
            refs.modalImg.dataset.index = refModalIndexData - 1;
        } else if (e.key == 'ArrowLeft' && refModalIndexData == 0) {
            refs.modalImg.src = imagesArray[imgArrLength - 1].original;
            refs.modalImg.alt = imagesArray[imgArrLength - 1].description;
            refs.modalImg.dataset.index = imgArrLength - 1;
        } else if (e.key == 'ArrowRight' && refModalIndexData != imgArrLength - 1) {
            refs.modalImg.src = imagesArray[refModalIndexData - 1 + 2].original;
            refs.modalImg.alt = imagesArray[refModalIndexData - 1 + 2].description;
            refs.modalImg.dataset.index = refModalIndexData - 1 + 2;
        } else if (e.key == 'ArrowRight' && refModalIndexData == imgArrLength - 1) {
            refs.modalImg.src = imagesArray[0].original;
        refs.modalImg.alt = imagesArray[0].description;
        refs.modalImg.dataset.index = 0;
        }
    }
}

window.addEventListener('keydown', arrowSlide);





