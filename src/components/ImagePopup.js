export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card ? "popup_active" : ""}`}>
      <div className="image-popup">
        <button
          className="image-popup__close-button close-button hover-transparent"
          type="button"
          onClick={onClose}
        />
        <img className="image-popup__image" src={card?.link} alt={card?.name} />
        <p className="image-popup__caption">{card?.name}</p>
      </div>
    </div>
  );
}
