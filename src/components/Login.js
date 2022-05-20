import { useState } from "react";
import InputError from "./InputError";
import StartPage from "./StartPage";
import InfoTooltip from "./InfoTooltip";

export default function Login({
  title,
  textButton,
  onLogin,
  isInfoPopupOpen,
  isSuccess,
  onCloseInfoPopup,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleLogin(e) {
    e.preventDefault();
    onLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <StartPage
      title={title}
      textButton={textButton}
      onSubmit={handleLogin}
      path="/sign-up"
      cornerLinkText="Регистрация"
    >
      <div className="form__inputs">
        <input
          type="text"
          id="name-input"
          className="form__input form__input_black"
          placeholder="Email"
          name="profileName"
          value={email}
          minLength="2"
          maxLength="40"
          required
          onChange={handleEmailChange}
        />
        <InputError />
        <input
          type="text"
          id="profession-input"
          className="form__input form__input_black"
          placeholder="Password"
          name="profileProfession"
          value={password}
          required
          minLength="2"
          maxLength="200"
          onChange={handlePasswordChange}
        />
        <InputError />
      </div>
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        message={
          isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }
        onClose={onCloseInfoPopup}
        onSuccess={isSuccess}
      />
    </StartPage>
  );
}
