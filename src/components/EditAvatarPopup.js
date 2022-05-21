import PopupWithForm from "./PopupWithForm";
import { useState, useRef, useEffect } from "react";
import InputError from "./InputError";

export default function AvatarEditPopup({isOpen, onUpdateAvatar, onClose}) {
  const [imageLink, setImageLink] = useState('');
  const [linkErrorText, setLinkErrorText] = useState('');
  const [isFormValid, setFormValid] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setImageLink("");
    setFormValid(inputRef.current.validity.valid);
  }, [isOpen]);

  function handleImageLinkChange() {
    setImageLink(inputRef.current.value);
    setFormValid(inputRef.current.validity.valid);
    setLinkErrorText(inputRef.current.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      altTextButton="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <div className="form__inputs">
        <input
          type="url"
          id="avatar-input"
          className="form__input form__input_link"
          placeholder="Ссылка на аватар"
          name="avatarLink"
          value={imageLink}
          ref={inputRef}
          onChange={handleImageLinkChange}
          required
        />
        <InputError
          isinputValid={isFormValid}
          errorText={linkErrorText}
        />
      </div>
    </PopupWithForm>
  );
}