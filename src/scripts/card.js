// @todo: Функция создания карточки
import {openModal} from "./modal";

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

const popupImage = document.querySelector('.popup_type_image');
const popupImageData = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

function openImagePopup(evt) {

    popupImageData.src = evt.target.src;
    popupImageData.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt.slice(43);
    openModal(popupImage);
}

export {createCard, deleteCard, likeCard, openImagePopup};