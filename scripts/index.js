// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(cardTitle, cardImage) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = cardTitle;
    cardElement.querySelector('.card__image').src = cardImage;
    cardElement.querySelector('.card__delete-button').addEventListener('click', Reset);
    cardList.append(cardElement);
}
// @todo: Функция удаления карточки
function Reset(evt) {
    const eventTarget = evt.target;
    eventTarget.parentElement.remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    createCard(card.name, card.link);
});