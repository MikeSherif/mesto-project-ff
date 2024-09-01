function openModal(modalWindow) {
    modalWindow.classList.add('popup_is-opened');
    document.addEventListener('keydown', function (evt) {
        if (evt.key === "Escape") {
            modalWindow.classList.remove('popup_is-opened');
        }
    });
}

function closeModal(modalWindow) {
    modalWindow.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', function (evt) {
        if (evt.key === "Escape") {
            modalWindow.classList.remove('popup_is-opened');
        }
    });
}

export {openModal, closeModal};