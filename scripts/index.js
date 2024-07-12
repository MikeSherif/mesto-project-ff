// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardInfo, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardInfo.name;
    const cardElementImage = cardElement.querySelector('.card__image');
    cardElementImage.src = cardInfo.link;
    cardElementImage.alt = 'На картинке изображено место под названием '+ cardInfo.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    cardList.append(createCard(card, deleteCard));
});
