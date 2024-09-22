import css from "./ErrorMessage.module.css";
interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className={css.errorWrapper}>
      <p className={css.errorText}>{error}</p>
    </div>
  );
};

export default ErrorMessage;
