function closeModalEsc (evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector('.popup_is-opened');
        openedPopup.classList.remove('popup_is-opened');
    }
}

function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalEsc);
}

function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
}

export {openModal, closeModal};