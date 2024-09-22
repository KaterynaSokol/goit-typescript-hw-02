import css from "./ImageCard.module.css";

interface ImageCardProps {
  description: string;
  small: string;
  regular: string;
  color: string;
  openModal: (url: string, description: string) => void;
}

const ImageCard: React.FunctionComponent<ImageCardProps> = ({
  description,
  small,
  regular,
  openModal,
}) => (
  <div className={css.imageWrapper}>
    <img
      src={small}
      alt={description}
      className={css.image}
      onClick={() => openModal(regular, description)}
    />
  </div>
);

export default ImageCard;
