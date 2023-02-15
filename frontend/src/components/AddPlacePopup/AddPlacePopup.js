import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

export default function AddPlacePopup(props) {
  const [place, setPlace] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  function handlePlaceChange(evt) {
    setPlace(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name: place,
      link: link,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="addPlace"
      title="Новое место"
      btnText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__field" htmlFor="place">
        <input
          value={place || ""}
          onChange={handlePlaceChange}
          className="popup__input"
          name="place"
          id="place"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="place-input-error popup__error"></span>
      </label>
      <label className="popup__field" htmlFor="link">
        <input
          value={link || ""}
          onChange={handleLinkChange}
          className="popup__input"
          name="link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="link-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
