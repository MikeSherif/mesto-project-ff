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
        //cardDeleteButton.addEventListener('click', deleteCard);
        cardDeleteButton.addEventListener('click', openPopupCardConfirmDelete);

    }
    //cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    const cardLikeButton = cardElement.querySelector('.card__like-button');
    cardInfo.likes.forEach((like) => {
        if (like._id === userId) {
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    })
    cardLikeButton.addEventListener('click', () => {
        if (cardLikeButton.classList.contains('card__like-button_is-active')) {
            unlikeCard(cardInfo.id)
                .then((response) => {
                    cardLikeCount.textContent = response.likes.length;

                })
            cardLikeButton.classList.remove('card__like-button_is-active');
        } else {
            likeCard(cardInfo.id)
                .then((response) => {
                    cardLikeCount.textContent = response.likes.length;
                })
            cardLikeButton.classList.add('card__like-button_is-active');
        }
    });
    cardElementImage.addEventListener('click', openImagePopup);
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
    deleteCardApi(evt.target.closest('.card').id);
}


export {createCard, deleteCard};