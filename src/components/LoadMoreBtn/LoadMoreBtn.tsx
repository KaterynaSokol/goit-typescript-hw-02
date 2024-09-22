import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn = ({ onClick }: LoadMoreBtnProps) => {
  return (
    <div>
      <button type="button" className={css.btn} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
