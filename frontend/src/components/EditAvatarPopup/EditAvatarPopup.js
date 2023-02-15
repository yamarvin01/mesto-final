import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import React from "react";

export default function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="editAvatar"
      title="Обновить аватар"
      btnText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <label className="popup__field" htmlFor="avatar">
        <input
          ref={inputRef}
          className="popup__input"
          name="avatar"
          id="avatar"
          type="url"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="avatar-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
