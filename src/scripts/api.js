export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-18',
    headers: {
        authorization: 'b5b1b6e6-dc47-4f9d-9970-65fb7065b8ad',
        'Content-Type': 'application/json'
    }
}

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(handleResponse);
}

export const handleFormProfileSubmitApi = (nameInput, jobInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameInput,
            about: jobInput
        })
    })
        .then(handleResponse);
}

export const getMyInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
    })
        .then(handleResponse)
}

export const handleProfileAvatarSubmitApi = (avatarUrlInput) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrlInput
        })
    })
        .then(handleResponse);
}

export const createNewCardApi = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
        .then(handleResponse);
}

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse);
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(handleResponse);
}

export const unlikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(handleResponse);
}

