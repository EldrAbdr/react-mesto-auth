import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AvatarEditpopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import QuestionPopup from "./QuestionPopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isQuestionPopupOpen, setQuestionPopupOpen] = useState(false);
  const [card, setCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setUserInfo] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .loadCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      .then((res) => {
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

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleAddPlace(card) {
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleQuestionPopup(e) {
    e.preventDefault();
    closeAllPopups();
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setQuestionPopupOpen(false);
  }

  function handleClickCard(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleClickCard}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <AvatarEditpopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarUpdate}
        ></AvatarEditpopup>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUserUpdate}
        ></EditProfilePopup>
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        ></AddPlacePopup>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <QuestionPopup
          isOpen={isQuestionPopupOpen}
          onClose={closeAllPopups}
          onSubmit={deleteCard}
          card={card}
        ></QuestionPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
