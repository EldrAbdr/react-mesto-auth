import PopupWithForm from "./PopupWithForm";
import { useState, useRef, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import InputError from "./InputError";

export default function AvatarEditPopup({isOpen, onUpdateAvatar, onClose}) {
  const [imageLink, setImageLink] = useState("");
  const [isLinkValid, setLinkValid] = useState(false);
  const [linkErrorText, setLinkErrorText] = useState("");
  const [isSubmitClick, setIsSubmitClick] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setImageLink("");
    setLinkValid(inputRef.current.validity.valid);
  }, [isOpen]);

  function handleImageLinkChange() {
    setImageLink(inputRef.current.value);
    setLinkValid(inputRef.current.validity.valid);
    setLinkErrorText(inputRef.current.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitClick(true);
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
      isFormValid={isLinkValid}
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
          isinputValid={isLinkValid}
          errorText={linkErrorText}
        ></InputError>
      </div>
    </PopupWithForm>
  );
}