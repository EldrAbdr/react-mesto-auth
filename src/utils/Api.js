export default class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
    }


    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    loadUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    editProfile({profileName, profileProfession}) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: profileName,
                about: profileProfession
            })
        })
            .then(this._checkResponse)
    }

    editAvatar(avatarLink) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then(this._checkResponse)
    }

    loadCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
            .then(cards => cards)
    }

    addNewCard({name, imageLink}) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: imageLink
            })
        })
            .then(this._checkResponse)
    }

    deleteCardOnServer(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked? 'DELETE': 'PUT',
            headers: this._headers
        })
            .then(this._checkResponse)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: '73bbc2c4-cda9-4c41-a59c-d7d4ba072805',
        'Content-Type': 'application/json'
    }
});