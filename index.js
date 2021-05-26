import images from "./gallery-items.js";

const refs = {
    gallery: document.querySelector('.gallery'),
     modal: document.querySelector('.lightbox'),
     modalImg:document.querySelector('.lightbox__image'),
}

let activeIndex = null;

const markup = images.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
        <a
            class="gallery__link"
            href=${preview}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>`
})

refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));

refs.gallery.addEventListener('click',openModal);

function openModal(e) {
    e.preventDefault();
    if (e.target.nodeName === 'IMG') {
        refs.modal.classList.add('is-open');
        refs.modalImg.src = e.target.dataset.source;
    }

    markup.forEach((el, ind)=> {
        if (el.includes(e.target.src)) {
            activeIndex = ind;
        }
    })
}


refs.modal.addEventListener('click', onCloseModal);

function closeModal() {
    refs.modal.classList.remove("is-open");
    refs.modalImg.src = '';
}

function onCloseModal(e) {
    if (e.target.nodeName === 'IMG') {
        return 
    }
    closeModal()
}

window.addEventListener('keyup', closeModalByEsc)

function closeModalByEsc(e) {
    if (e.key !== 'Escape') {
        return
    }
    closeModal()
}


window.addEventListener('keyup', changeImageByArrow);

function changeImageByArrow(e) {
    if (e.key === 'ArrowRight' && activeIndex < images.length - 1) {
        activeIndex += 1;
        refs.modalImg.src = images[activeIndex].original;
    }

    if (e.key === 'ArrowLeft' && activeIndex > 0) {
        activeIndex -= 1;
        refs.modalImg.src = images[activeIndex].original;
    }

    if (e.key === 'ArrowRight' && activeIndex === images.length - 1) {
        activeIndex = 0;
        refs.modalImg.src = images[activeIndex].original
    }

     if (e.key === 'ArrowLeft' && activeIndex===0) {
        activeIndex = images.length - 1;
        refs.modalImg.src = images[activeIndex].original
    }
}