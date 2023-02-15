import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

export default function DeleteCardPopup(props) {
  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      btnText={props.isLoading ? "Сохранение..." : "Да"}
      onSubmit={props.onDeleteCard}
      isOpen={props.isOpen}
      onClose={props.onClose}
    />
  );
}
