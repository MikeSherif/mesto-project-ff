import '../pages/index.css';
import {initialCards} from "./cards.js";
import {createCard, deleteCard, likeCard, openImagePopup} from "./card.js";
import {openModal, closeModal} from "./modal.js";
// @todo: Темплейт карточки

// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const popups = document.querySelectorAll(".popup");
const popupsCloseButton = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу

initialCards.forEach(function (card) {
    cardList.append(createCard(card, deleteCard, likeCard, openImagePopup));
});

addButton.addEventListener("click", function (event) {
    openModal(popupNewCard);
});

editButton.addEventListener("click", function (event) {
    openModal(popupEdit);
})

popupsCloseButton.forEach(function (element) {
    element.addEventListener("click", function (event) {
        closeModal(event.target.closest('.popup'));
    });
})


popups.forEach(function (element) {
    element.addEventListener('click', function (evt) {
        if ((evt.target.classList.contains('popup'))) {
            closeModal(element);
        }
    });
})


// Находим форму в DOM
const editProfileForm = popupEdit.querySelector('form[name=edit-profile]')// Воспользуйтесь методом querySelector()

// Находим поля формы в DOM
const nameInput = editProfileForm.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
nameInput.value = document.querySelector('.profile__title').textContent;

const jobInput = editProfileForm.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
jobInput.value = document.querySelector('.profile__description').textContent;

popupEdit.querySelector('.popup__close').addEventListener('click', function () {
    editProfileForm.reset();
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
});

const profileTittle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileTittle.textContent = name;
    profileDescription.textContent = job;
    nameInput.value = profileTittle.textContent;
    jobInput.value = profileDescription.textContent;

    closeModal(evt.target.closest('.popup'));
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

const addCardForm = document.querySelector('form[name=new-place]');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = addCardForm.querySelector('.popup__input_type_url');

function handleFormSubmitCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.////
    cardList.prepend(createCard({
        name: cardNameInput.value,
        link: cardUrlInput.value
    }, deleteCard, likeCard, openImagePopup));
    addCardForm.reset();
    closeModal(evt.target.closest('.popup'));
}

addCardForm.addEventListener('submit', handleFormSubmitCard);
