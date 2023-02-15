class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  editProfile({ name, about }) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editProfileAvatar(avatar) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addNewCard({ name, link }) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  deleteCard(cardId) {
    return this._request(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
    if (!isLiked) {
      return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    }
  }
}

export const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  // headers: {
  //   authorization: "37ded591-0952-406f-9bd6-1d8027d482f6",
  //   "Content-Type": "application/json",
  // },
  baseUrl: "http://158.160.26.153:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
