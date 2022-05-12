import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import InputError from "./InputError";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    setImageLink("");
    setName("");
  }, [isOpen]);

  function handlePlaceNameChange(e) {
    setName(e.target.value);
  }

  function handleImageLinkChange(e) {
    setImageLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      imageLink,
    });
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton="Создать"
      altTextButton="Создание..."
    >
      <div className="form__inputs">
        <input
          type="text"
          id="place-name-input"
          className="form__input form__input_place-name"
          placeholder="Название"
          name="name"
          value={name}
          minLength="2"
          maxLength="30"
          onChange={handlePlaceNameChange}
          required
        />
        <span className="form__input-error avatar-input-error"></span>
        <input
          type="url"
          id="link-input"
          className="form__input form__input_link"
          placeholder="Ссылка на картинку"
          name="imageLink"
          value={imageLink}
          onChange={handleImageLinkChange}
          required
        />
        <span className="form__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
