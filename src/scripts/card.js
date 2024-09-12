// @todo: Функция создания карточки

import {likeCard, unlikeCard, deleteCardApi} from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardInfo, deleteCard, openImagePopup, openPopupCardConfirmDelete, userId) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.id = cardInfo.id;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.src = cardInfo.link;
    cardElementImage.alt = 'На картинке изображено место под названием ' + cardInfo.name;
    const cardLikeCount = cardElement.querySelector('.card__like-counter');
    cardLikeCount.textContent = cardInfo.likes.length;
    const cardDeleteButton = cardElement.querySelector('.card__delete-button');
    if (cardInfo.owner.id !== userId) {
        cardDeleteButton.style.display = 'none';
    } else {
        cardDeleteButton.addEventListener('click', openPopupCardConfirmDelete);
    }
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardInfo.likes.forEach((like) => {
        if (like._id === userId) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    })
    cardLikeButton.addEventListener('click', cardLikeMethod);
    cardElementImage.addEventListener('click', openImagePopup);
    return cardElement;
}

function cardLikeMethod (evt) {
    const likeMethod = evt.target.classList.contains('card__like-button_is-active') ? unlikeCard : likeCard;
    likeMethod(evt.target.closest('.card').id)
        .then((response) => {
            evt.target.nextElementSibling.textContent = response.likes.length;
            evt.target.classList.toggle('card__like-button_is-active');
        })
        .catch(err => console.log(err));
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    deleteCardApi(evt.target.closest('.card').id)
        .then(()=> {
            evt.target.closest('.card').remove();
        })
}


export {createCard, deleteCard};