import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
interface SearchBarProps {
  onSubmit: (searchTerm: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchTerm = (
      form.elements.namedItem("query") as HTMLInputElement
    ).value.trim();

    if (!searchTerm) {
      toast("Please enter the search term!", {
        duration: 2000,
        position: "top-center",
        style: {
          marginTop: 50,
          color: "#d41c00",
          fontWeight: "semi-bold",
        },
      });
      return;
    }

    onSubmit(searchTerm);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.inputWrapper}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search"
          />
          <button className={css.btn} type="submit">
            🔍
          </button>
        </div>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
