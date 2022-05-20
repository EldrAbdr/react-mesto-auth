import { api } from "../utils/Api";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
  userEmail,
}) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();

  function handleSignOut() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  return (
    <div className="page">

      <Header
        userEmail={userEmail}
        onCornerLinkClick={handleSignOut}
        cornerLinkText="Выйти"
      />
      <main className="container">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-container">
              <img
                className="profile__avatar"
                src={currentUser?.avatar}
                alt="аватар"
              />
              <button
                type="button"
                className="profile__avatar-edit-button hover-transparent"
                onClick={onEditAvatar}
              />
            </div>
            <div className="profile__text-info">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <p className="profile__profession">{currentUser?.about}</p>
            </div>
            <button
              type="button"
              aria-label="редактировать профиль"
              className="profile__edit-button hover-transparent"
              onClick={onEditProfile}
            />
          </div>
          <button
            type="button"
            aria-label="добавить карточку"
            className="profile__add-button hover-transparent"
            onClick={onAddPlace}
          />
        </section>
        <section className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
