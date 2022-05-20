import success from "../images/success.svg";
import fail from "../images/fail.svg";

export default function InfoTooltip({ isOpen, onClose, message, onSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_active" : ""}`}>
      <div className="form form_noInputs">
        <button
          type="button"
          className="form__edit-close-button close-button hover-transparent"
          onClick={onClose}
        />
        <img
          src={onSuccess ? success : fail}
          className="popup__picture"
          alt={message}
        />
        <p className="popup__message">{message}</p>
      </div>
    </div>
  );
}