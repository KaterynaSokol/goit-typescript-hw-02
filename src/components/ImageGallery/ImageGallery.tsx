import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../../types";

type GalleryProps = {
  images: Image[];
  openModal: (url: string, alt: string) => void;
};

const ImageGallery = ({ images, openModal }: GalleryProps) => {
  return (
    <ul className={css.imageList}>
      {images.map(({ id, alt_description, urls, color }: Image) => {
        return (
          <li key={id} className={css.imageItem}>
            <ImageCard
              description={alt_description || "No description"}
              small={urls.small}
              regular={urls.regular}
              color={color}
              openModal={openModal}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
