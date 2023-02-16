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

  getUserInfo(token) {
    return this._request(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getInitialCards(token) {
    return this._request(this._baseUrl + "/cards", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  editProfile({ name, about }, token) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  editProfileAvatar(avatar, token) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  addNewCard({ name, link }, token) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, link: link }),
    });
  }

  deleteCard(cardId, token) {
    return this._request(this._baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    if (isLiked) {
      return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (!isLiked) {
      return this._request(this._baseUrl + `/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
}

export const api = new Api({
  // baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  baseUrl: "http://158.160.26.153:3000",
  headers: {
    // authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VjYjFhYTk1NTgxYTY5NDI2MDRlYzAiLCJpYXQiOjE2NzY1NTkyNzgsImV4cCI6MTY3NzE2NDA3OH0.P39FflbWatlN_4OxsIpc1sOWsSQtyeRPt_pu9Y6Ht3o",
    "Content-Type": "application/json",
  },
});
