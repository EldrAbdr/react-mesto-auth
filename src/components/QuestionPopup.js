import PopupWithForm from "./PopupWithForm";
import { useState, useRef, useEffect } from "react";

export default function QuestionPopup(props) {
  const [card, setCard] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.card);
  }

  return (
    <PopupWithForm
      name="delete-question-form"
      title="Вы уверены?"
      textButton="Да"
      altTextButton="Удаление..."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

