import PopupWithForm from "./PopupWithForm";

export default function QuestionPopup(props) {
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
    />
  );
}

