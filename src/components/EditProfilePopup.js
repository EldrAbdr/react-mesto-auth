import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import InputError from "./InputError";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const nameRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      profileName: name,
      profileProfession: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      textButton="Сохранить"
      altTextButton="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__inputs">
        <input
          type="text"
          id="name-input"
          className="form__input form__input_name"
          placeholder="Имя"
          name="profileName"
          value={name}
          minLength="2"
          maxLength="40"
          required
          onChange={handleNameChange}
        />
        <span className="form__input-error avatar-input-error"></span>
        <input
          type="text"
          id="profession-input"
          className="form__input form__input_profession"
          placeholder="Профессия"
          name="profileProfession"
          value={description}
          required
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error avatar-input-error"></span>
      </div>
    </PopupWithForm>
  );
}
