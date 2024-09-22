import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ImageModal from "./components/ImageModal/ImageModal";
import { requestPicturesBySearchValue } from "./services/api";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Image, Response } from "./types";

interface ModalState {
  isOpen: boolean;
  imgUrl: string;
  imgAlt: string;
}

function App() {
  const [modalIsOpen, setIsOpen] = useState<ModalState>({
    isOpen: false,
    imgUrl: "",
    imgAlt: "",
  });
  const [images, setImages] = useState<Image[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

  const handleSubmit = (searchTerm: string): void => {
    setSearchTerm(searchTerm);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { results, total_pages }: Response =
          await requestPicturesBySearchValue(searchTerm, page);

        if (results.length === 0 && page === 1) {
          setNoResults(true);
        } else {
          setImages((prevImages) =>
            page === 1 ? results : [...prevImages, ...results]
          );
          setPagination(page < total_pages);
          setNoResults(false);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchTerm, page]);

  useEffect(() => {
    if (galleryRef.current && prevScrollHeight) {
      const newScrollHeight = galleryRef.current.scrollHeight;
      window.scrollBy({
        top: newScrollHeight - prevScrollHeight,
        behavior: "smooth",
      });
    }
  }, [images, prevScrollHeight]);

  const handleLoadMore = (): void => {
    if (galleryRef.current) {
      setPrevScrollHeight(galleryRef.current.scrollHeight);
    }
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (url: string, alt: string): void => {
    setIsOpen({
      ...modalIsOpen,
      isOpen: true,
      imgUrl: url,
      imgAlt: alt || "Image",
    });
  };

  const closeModal = (): void => {
    setIsOpen({ ...modalIsOpen, isOpen: false, imgUrl: "", imgAlt: "Image" });
  };

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {noResults && (
        <p style={{ color: "red" }}>
          No results found for {searchTerm}. Please try again.
        </p>
      )}
      {error !== null && <ErrorMessage error={error} />}
      <div ref={galleryRef} className="imageList">
        {images.length > 0 && (
          <ImageGallery images={images} openModal={openModal} />
        )}
      </div>
      {pagination && <LoadMoreBtn onClick={handleLoadMore} />}
      {isLoading && <Loader />}
      <ImageModal
        isOpen={modalIsOpen.isOpen}
        imgUrl={modalIsOpen.imgUrl}
        imgAlt={modalIsOpen.imgAlt}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
