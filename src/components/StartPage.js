import Header from "./Header";
import { Link } from "react-router-dom";

export default function StartPage({
  name,
  title,
  onSubmit,
  textButton,
  children,
  onCornerLinkClick,
  cornerLinkText,
  path,
  showLoginMessage,
}) {
  return (
    <div className="page">
      <Header
        onCornerLinkClick={onCornerLinkClick}
        cornerLinkText={cornerLinkText}
        path={path}
      />
      <div className="form__container">
        <form
          action="#"
          method="get"
          className="form form_black"
          name={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="form__title form__title_white">{title}</h2>
          {children}
          <button
            type="submit"
            className="form__submit-button form__submit-button_white"
          >
            {textButton}
          </button>
        </form>
        {showLoginMessage ? (
          <div className="form__underSubmitLine">
            <p>Уже зарегистрированы?</p>
            <Link to="/sign-in" className="form__underSubmitLink">
              Войти
            </Link>
          </div>
        ) : ""}
      </div>
    </div>
  );
}
