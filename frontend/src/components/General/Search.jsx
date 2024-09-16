import { SearchIcon } from "../../assets/svg";

export default function Search() {
  return (
    <div className="search-form">
      <input
        type="search"
        name="search-input"
        placeholder="Filtrer et chercher"
        id="search-input"
      />
      <button className="center exclude-button">
        <SearchIcon />
      </button>
    </div>
  );
}
