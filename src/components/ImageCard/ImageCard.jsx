import css from "./ImageCard.module.css";

const ImageCard = ({ description, small, regular, openModal }) => {
  return (
    <div className={css.imageWrapper}>
      <img
        src={small}
        alt={description}
        className={css.image}
        onClick={() => openModal(regular, description)}
      />
    </div>
  );
};

export default ImageCard;
