// @todo: Функция создания карточки
import {closeModal} from "./modal";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardInfo, deleteCard, likeCard, openImagePopup) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.src = cardInfo.link;
    cardElementImage.alt = 'На картинке изображено место под названием ' + cardInfo.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElementImage.addEventListener('click', openImagePopup);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

function likeCard(evt) {
    evt.target.closest('.card__like-button').classList.toggle('card__like-button_is-active');
}

function openImagePopup(evt) {
    const popupImage = document.querySelector('.popup_type_image');
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image').alt = evt.target.alt;
    popupImage.querySelector('.popup__caption').textContent = evt.target.alt.slice(43);
    popupImage.classList.add('popup_is-opened');
    popupImage.classList.remove('popup__close');
    document.addEventListener('keydown', function (evt) {
        if (evt.key === "Escape") {
            popupImage.classList.remove('popup_is-opened');
        }
    });
}

export {createCard, deleteCard, likeCard, openImagePopup};