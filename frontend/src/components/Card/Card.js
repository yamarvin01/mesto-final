import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

const Card = React.memo((props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardDeleteButtonClassName = `
    card__button card__button_type_delete
    ${isOwn && "card__button_visible"}`;
  const cardLikeButtonClassName = `
    card__button card__button_type_like
    ${isLiked && "card__button_status_active"}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        onClick={handleClick}
        className="card__image"
        alt={`Изображение ${props.card.name}`}
        src={props.card.link}
      />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button
            onClick={handleLike}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайк"
          ></button>
          <p className="card__like-text">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Кнопка удаления"
      ></button>
    </article>
  );
});

export default Card;
