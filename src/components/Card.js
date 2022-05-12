import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext } from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser?._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    !isOwn ? `card__delete-button_hidden` : ``
  }`;
  const isLiked = card.likes.some((user) => user._id === currentUser?._id);
  const cardLikeClassName = `card__like ${isLiked ? `card__like_black` : ``}`;

  function handleClick() {
    onCardClick(card);
  }

  function handlelikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <button
        type="button"
        className={`hover-transparent ${cardDeleteButtonClassName}`}
        onClick={handleCardDelete}
      />
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__like-section">
          <button
            type="button"
            className={`${cardLikeClassName} hover-transparent`}
            onClick={handlelikeClick}
          />
          <div className="card__like-number">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}
