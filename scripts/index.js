// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(card, f) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__image').alt = 'На картинке изображено место под названием '+ card.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', f);
    return cardElement;
}
// @todo: Функция удаления карточки
function resetButton(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
}
// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    cardList.append(createCard(card, resetButton));
});
