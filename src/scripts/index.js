import '../pages/index.css';
import {createCard, deleteCard} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import {enableValidation, clearValidation} from "./validation.js";
import {
    config,
    createNewCardApi,
    getInitialCards,
    getMyInformation,
    handleFormProfileSubmitApi,
    handleProfileAvatarSubmitApi
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

const popupImage = document.querySelector('.popup_type_image');
const popupImageData = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupCardConfirmDelete = document.querySelector(".popup_type_confirm_delete");

const validationConfig = {
    formSelector: '.popup__form',
    inputElement: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

//Функция открытия попапа по нажатию на картинку карточки
function openImagePopup(evt) {

    popupImageData.src = evt.target.src;
    popupImageData.alt = evt.target.alt;
    popupImageCaption.textContent = evt.target.alt.slice(43);
    openModal(popupImage);
}

//Функция открытия попапа для подтверждения удаления карточки

function openPopupCardConfirmDelete(evt) {
    openModal(popupCardConfirmDelete);
    const deleteData = evt;
    popupCardConfirmDelete.querySelector('.popup__button').onclick = () => {
        deleteCard(deleteData);
        closeModal(popupCardConfirmDelete);
    };
}

function createUX(evt) {
        closeModal(evt.target.closest('.popup'));
        evt.target.querySelector('.popup__button').textContent = 'Сохранить';
}

const changeButtonUX = (evt) => {
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
}

// @todo: Вывести карточки на страницу
const promiseFirst = getMyInformation();
const promiseSecond = getInitialCards();
const promises = [promiseFirst, promiseSecond];

Promise.all(promises)
    .then((results) => {
        results[1].forEach((card) => {
            cardList.append(createCard({
                name: card.name,
                link: card.link,
                likes: card.likes,
                id: card._id,
                owner: {id: card.owner._id}
            }, deleteCard, openImagePopup, openPopupCardConfirmDelete, results[0]._id));
        })
        nameInput.value = results[0].name;
        jobInput.value = results[0].about;
        profileTittle.textContent = results[0].name;
        profileDescription.textContent = results[0].about;
        avatarImage.style.backgroundImage = `url('${results[0].avatar}')`;
    })

enableValidation(validationConfig);

addButton.addEventListener("click", function (event) {
    openModal(popupNewCard);
});

editButton.addEventListener("click", function (event) {
    openModal(popupEdit);
    clearValidation(popupEdit, validationConfig)
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

popupEdit.querySelector('.popup__close').addEventListener('click', function () {
    editProfileForm.reset();
    nameInput.value = profileTittle.textContent;
    jobInput.value = profileDescription.textContent;
});

const profileTittle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;
    changeButtonUX(evt);
    handleFormProfileSubmitApi(name, job)
        .then((res) => {
            profileTittle.textContent = res.name;
            profileDescription.textContent = res.about;
            nameInput.value = profileTittle.textContent;
            jobInput.value = profileDescription.textContent;
        })
        .finally(() => {
            createUX(evt);
        });

}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

const addCardForm = document.querySelector('form[name=new-place]');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardUrlInput = addCardForm.querySelector('.popup__input_type_url');

function handleFormSubmitCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.////
    changeButtonUX(evt);
    createNewCardApi(cardNameInput.value, cardUrlInput.value)
        .then((res) => {
            cardList.prepend(createCard(res, deleteCard, openImagePopup, openPopupCardConfirmDelete, res.owner.id));
        })
        .finally(() => {
            createUX(evt);
        })
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
}

addCardForm.addEventListener('submit', handleFormSubmitCard);

const profileEditAvatarForm = popupEditProfileAvatar.querySelector('form[name=edit-profile-avatar]');
const avatarUrlInput = profileEditAvatarForm.querySelector('.popup__input_type_avatar-url');
const avatarImage = document.querySelector('.profile__image');



function handleFormProfileSubmitAvatar(evt) {
    evt.preventDefault();
    changeButtonUX(evt);
    handleProfileAvatarSubmitApi(avatarUrlInput.value)
        .then((res) => {
            avatarImage.style.backgroundImage = `url('${res.avatar}')`;
        })
        .finally(()=> {
            createUX(evt);
        })
    profileEditAvatarForm.reset();

}

profileEditAvatarForm.addEventListener('submit', handleFormProfileSubmitAvatar);






