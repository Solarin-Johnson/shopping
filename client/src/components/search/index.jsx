import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../../DataContext";
import {
  FetchArrivals,
  FetchBest,
  FetchFavorite,
  FetchFeatured,
} from "../utils";
import "./search.scss";

export const SearchBox = ({ searchX, _setSearch }) => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("name");
  const searchBoxRef = useRef(null);

  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);

  const filterData = [
    { label: "Name", icon: "fa-solid fa-file-signature" },
    { label: "Tag", icon: "fa-solid fa-tag" },
    { label: "Price", icon: "fa-solid fa-money-bill-1" },
    { label: "Availability", icon: "fa-solid fa-magnifying-glass-location" },
  ];
  // useEffect(() => {
  //   if (searchIcon) {
  //     searchIcon.addEventListener("click", () => setSearch(true));
  //   }
  // }, []);

  useEffect(() => {
    const handleBlur = (e) => {
      const searchIcon = document.querySelectorAll(".nav")[0].lastChild;
      if (
        search &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target) &&
        !searchBoxRef.current.parentElement.children[1].contains(e.target)
      ) {
        setSearch(false);
        _setSearch(false);
        setQuery("");
      }
      if (searchBoxRef.current && searchIcon.contains(e.target)) {
        setSearch(true);
        _setSearch(true);
        FocusSearch();
      }
    };
    document.addEventListener("click", handleBlur);

    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [_setSearch, search]);

  const FocusSearch = () => {
    setTimeout(() => {
      searchBoxRef.current.children[1].firstChild.focus();
    }, 100);
  };

  return (
    <div className="search-box-container">
      <div
        ref={searchBoxRef}
        className="search-box"
        id={search && "show-search"}
        style={{
          left: search ? "inherit" : searchX + "px",
        }}
      >
        <div
          className="search-back"
          onClick={() => {
            setSearch(false);
            _setSearch(false);
            setQuery("");
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className="search-input">
          <input
            type="text"
            name=""
            id="search-input"
            value={query}
            onInput={(e) => setQuery(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div
          className="search-clear"
          onClick={() => {
            setQuery("");
            FocusSearch();
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="search-filter">
        {filterData.map((data, index) => (
          <SearchFilter
            icon={data.icon}
            label={data.label}
            i={index}
            filter={(data) => setFilter(data)}
          />
        ))}
      </div>
      {query && <SearchResult query={query} filter={filter} />}
    </div>
  );
};

const SearchResult = ({ query, filter }) => {
  const Query = query.toLowerCase();
  const { favData } = useDataContext();
  const [_filter, setFilter] = useState(filter);

  const [arrival, setArrival] = useState(false);
  FetchArrivals(setArrival);

  const [best, setBest] = useState(false);
  FetchBest(setBest);

  const [featured, setFeatured] = useState(false);
  FetchFeatured(setFeatured);

  const [favorite, setFavorite] = useState(false);
  FetchFavorite(setFavorite);

  const database = [...arrival, ...best, ...featured, ...favorite];

  useEffect(() => {
    setFavorite(favData);
  }, [favData]);

  return (
    <div className="search-result-container">
      <div className="search-result"></div>
    </div>
  );
};

export const SearchFilter = ({ icon, label, i, filter }) => {
  const selectMenu = (e) => {
    const siblings = Array.from(e.currentTarget.parentElement.children).filter(
      (child) => child !== e.currentTarget
    );
    siblings.forEach((sibling) => {
      sibling.classList.remove("active-filter");
    });
    e.currentTarget.classList.add("active-filter");
  };
  return (
    <div
      className={i === 0 && "active-filter"}
      onClick={(e) => {
        // filter(e.currentTarget.lastChild.textContent);
        filter(label);
        selectMenu(e);
      }}
    >
      <i class={icon}></i>
      <span>{label}</span>
    </div>
  );
};
