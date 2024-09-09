import '../pages/index.css';
import {createCard, deleteCard, likeCard, openImagePopup} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import {enableValidation} from "./validation.js";
import {
    createNewCardApi,
    getInitialCards,
    getMyInformation,
    handleFormProfileSubmitApi,
    handleProfileAvatarSubmitApi, Promises
} from './api.js'

// @todo: Темплейт карточки

// @todo: DOM узлы
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const editProfileAvatar = document.querySelector(".profile__image");
const popups = document.querySelectorAll(".popup");
const popupsCloseButton = document.querySelectorAll(".popup__close");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditProfileAvatar = document.querySelector(".popup_type_edit_avatar");
const cardList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
/*getInitialCards()
    .then((result) => {
        result.forEach((card) => {
            cardList.append(createCard({name: card.name, link: card.link, likes: card.likes},deleteCard, likeCard, openImagePopup))
        })
    });*/


addButton.addEventListener("click", function (event) {
    openModal(popupNewCard);
});

editButton.addEventListener("click", function (event) {
    openModal(popupEdit);
})

editProfileAvatar.addEventListener("click", function (event) {
    openModal(popupEditProfileAvatar);
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


// Форма редактирования профиля
const editProfileForm = popupEdit.querySelector('form[name=edit-profile]')// Воспользуйтесь методом querySelector()
const nameInput = editProfileForm.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = editProfileForm.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

getMyInformation()
    .then((response) => {
        nameInput.value = response.name;
        jobInput.value = response.about;
    })

popupEdit.querySelector('.popup__close').addEventListener('click', function () {
    editProfileForm.reset();
    getMyInformation()
        .then((response) => {
            nameInput.value = response.name;
            jobInput.value = response.about;
        })
});

const profileTittle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

getMyInformation()
    .then((res) => {
        profileTittle.textContent = res.name;
        profileDescription.textContent = res.about;
    });

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileTittle.textContent = name;
    profileDescription.textContent = job;
    nameInput.value = profileTittle.textContent;
    jobInput.value = profileDescription.textContent;
    handleFormProfileSubmitApi(nameInput.value, jobInput.value);
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
    createNewCardApi(cardNameInput.value, cardUrlInput.value)
    addCardForm.reset();
    enableValidation({
        formSelector: '.popup__form',
        inputElement: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button-inactive',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
    });
    closeModal(evt.target.closest('.popup'));
}

addCardForm.addEventListener('submit', handleFormSubmitCard);

const profileEditAvatarForm = popupEditProfileAvatar.querySelector('form[name=edit-profile-avatar]');
const avatarUrlInput = profileEditAvatarForm.querySelector('.popup__input_type_avatar-url');
const avatarImage = document.querySelector('.profile__image');
getMyInformation()
    .then((response) => {
        avatarImage.style.backgroundImage = `url('${response.avatar}')`;
    })
function handleFormProfileSubmitAvatar(evt) {
    evt.preventDefault();
    avatarImage.style.backgroundImage = `url('${avatarUrlInput.value}')`;
    handleProfileAvatarSubmitApi(avatarUrlInput.value);
    console.log(avatarUrlInput.value);
    profileEditAvatarForm.reset();
    closeModal(evt.target.closest('.popup'));
}

profileEditAvatarForm.addEventListener('submit', handleFormProfileSubmitAvatar);

const promiseFirst = getMyInformation();
const promiseSecond = getInitialCards();
const promises = [promiseFirst, promiseSecond];

Promise.all(promises)
    .then((results) => {
        results[1].forEach((card) => {
            if (results[0]._id === card.owner._id) {
                cardList.append(createCard({name: card.name, link: card.link, likes: card.likes}, deleteCard, likeCard, openImagePopup, true));
            }
            else {
                cardList.append(createCard({name: card.name, link: card.link, likes: card.likes}, deleteCard, likeCard, openImagePopup, false))
            }
        })
    })

enableValidation({
    formSelector: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});



