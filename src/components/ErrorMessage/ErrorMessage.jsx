import css from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={css.errorWrapper}>
      <p className={css.errorText}>
        Oops! Something went wrong. Please try again later.
      </p>
    </div>
  );
};

export default ErrorMessage;
