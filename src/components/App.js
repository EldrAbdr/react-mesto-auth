import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AvatarEditPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import QuestionPopup from "./QuestionPopup";
import Login from "./Login";
import { Switch, Route, useHistory } from "react-router-dom";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { checkJwtValidity, login, register } from "../utils/Auth";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isQuestionPopupOpen, setQuestionPopupOpen] = useState(false);
  const [card, setCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setUserInfo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .loadCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    checkToken();
  }, []);

  useEffect(() => {
    api
      .loadUserInfo()
      .then((res) => {
        setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //////////////////// auth functions
  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkJwtValidity(token)
        .then((userData) => {
          setLoggedIn(true);
          setUserEmail(userData.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    } else {
      setLoggedIn(false);
    }
  }

  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res.ok) {
          history.push("/sign-in");
          setInfoPopupOpen(true);
          setRegSuccess(true);
        } else {
          setInfoPopupOpen(true);
          setRegSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              if (data.token) {
                setLoggedIn(true);
                setUserEmail(email);
                localStorage.setItem("jwt", data.token);
                history.push("/");
              }
            })
            .catch((err) => console.log(err));
        } else {
          setRegSuccess(false);
          setInfoPopupOpen(true);
        }
      })
      .catch((err) => console.log(err));
  }

  ////////////////////card functions
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => {
          return cards.map((item) => {
            return item._id === card._id ? newCard : item;
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteCard(card) {
    api
      .deleteCardOnServer(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter((item) => {
            return item._id !== card._id;
          });
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(cardForDelete) {
    setQuestionPopupOpen(true);
    setCard(cardForDelete);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleAddPlace(card) {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }
  ////////////////////profile functions
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAvatarUpdate(avatarLink) {
    api
      .editAvatar(avatarLink)
      .then((res) => {
        setUserInfo(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
        closeAllPopups();
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleUserUpdate(userInfo) {
    api
      .editProfile(userInfo)
      .then((res) => {
        setUserInfo(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setQuestionPopupOpen(false);
    setInfoPopupOpen(false);
  }

  function handleClickCard(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleClickCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            userEmail={userEmail}
            loggedIn={loggedIn}
            exact
            path="/"
          />
          <Route path="/sign-in">
            <Login
              title="Вход"
              textButton="Войти"
              onLogin={handleLogin}
              isInfoPopupOpen={isInfoPopupOpen}
              isSuccess={isRegSuccess}
              onCloseInfoPopup={closeAllPopups}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              title="Регистрация"
              textButton="Зарегистрироваться"
              onRegister={handleRegister}
              isInfoPopupOpen={isInfoPopupOpen}
              isSuccess={isRegSuccess}
              onCloseInfoPopup={closeAllPopups}
            />
          </Route>
        </Switch>
        <AvatarEditPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <QuestionPopup
          isOpen={isQuestionPopupOpen}
          onClose={closeAllPopups}
          onSubmit={deleteCard}
          card={card}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
