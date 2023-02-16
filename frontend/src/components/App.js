import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { api } from "../utils/api";
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CurrentUserEmailContext } from "../context/CurrentUserEmailContext";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup/DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ImagePopup from "./ImagePopup/ImagePopup";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Main from "./Main/Main";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";

export default function App() {
  const [token, setToken] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
  const [infoTooltipText, setInfoTooltipText] = React.useState('');
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isDeleteCardPopupOpen;
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([userData, cardList]) => {
          setCurrentUser(userData);
          setCards(cardList);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      tokenCheck();
    }
  }, [loggedIn]);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function closeByClick(evt) {
      if(evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keyup', closeByEscape);
      document.addEventListener('mouseup', closeByClick);
    } else {
      document.removeEventListener('keyup', closeByEscape);
      document.removeEventListener('mouseup', closeByClick);
    }
  }, [isOpen]);

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      api.getUserInfo(token)
        .then((userData) => {
          setLoggedIn(true);
          setToken(token);
          setCurrentUserEmail(userData.email);
          if (history.location.pathname !== "/") {
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.editProfileAvatar(newAvatar.avatar, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true);
    api.editProfile(newUserData, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDeleteSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCard._id, token)
      .then(() => {
        setCards(state => state.filter(card => card._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCardData) {
    setIsLoading(true);
    api.addNewCard(newCardData, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpened(false);
    setSelectedCard({});
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsInfoTooltipOpened(true);
        setIsInfoTooltipSuccess(true);
        history.push('/sign-in');
        setInfoTooltipText("Вы успешно зарегистировались!");
      })
      .catch((err) => {
        setIsInfoTooltipOpened(true);
        setIsInfoTooltipSuccess(false);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setLoggedIn(true);
        setCurrentUserEmail(email);
        history.push('/');
      })
      .catch((err) => {
        setIsInfoTooltipOpened(true);
        setIsInfoTooltipSuccess(false);
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err.message);
      });
  }

  function signOut() {
    setLoggedIn(false);
    setCurrentUserEmail('');
    localStorage.removeItem('token');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmailContext.Provider value={currentUserEmail}>
        <div className="page">
          <Header
            loggedIn={loggedIn}
            signOut={signOut}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <div className="loginContainer">
                <Login onLogin={handleLogin}/>
              </div>
            </Route>
            <Route path="/sign-up">
              <div className="registerContainer">
                <Register
                  onRegister={handleRegister}
                />
              </div>
            </Route>
          </Switch>
          <Footer />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          ></EditAvatarPopup>
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          ></EditProfilePopup>
          <AddPlacePopup
            onAddCard={handleAddPlaceSubmit}
            isLoading={isLoading}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
          >
          </AddPlacePopup>
          <DeleteCardPopup
            onDeleteCard={handleCardDeleteSubmit}
            isLoading={isLoading}
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
          >
          </DeleteCardPopup>
          <ImagePopup
            name="image"
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpened={isInfoTooltipOpened}
            isSuccess={isInfoTooltipSuccess}
            text={infoTooltipText}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserEmailContext.Provider>
    </CurrentUserContext.Provider>
  );
}
