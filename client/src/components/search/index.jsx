import { useEffect, useRef, useState } from "react";
import { useDataContext } from "../../DataContext";
import {
  FetchArrivals,
  FetchBest,
  FetchFavorite,
  FetchFeatured,
} from "../utils";
import "./search.scss";
import { CollectionCard } from "../collection/collection";

export const SearchBox = ({ searchX, _setSearch }) => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("name");
  const searchBoxRef = useRef(null);

  // useEffect(() => {
  //   console.log(filter);
  // }, [filter]);

  const filterData = [
    { label: "name", icon: "fa-solid fa-file-signature" },
    { label: "tag", icon: "fa-solid fa-tag" },
    { label: "price", icon: "fa-solid fa-money-bill-1" },
    { label: "availability", icon: "fa-solid fa-magnifying-glass-location" },
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
        !searchBoxRef.current.parentElement.contains(e.target)
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
            type={filter === "price" ? "number" : "text"}
            name=""
            id="search-input"
            value={query}
            onInput={(e) => setQuery(e.target.value)}
            placeholder={`Search ${filter} ...`}
            autoComplete="off"
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
      {query && (
        <SearchResult
          setSearch={(data) => setSearch(data)}
          _setSearch={(data) => _setSearch(data)}
          setQuery={(data) => setQuery(data)}
          query={query}
          filter={filter}
        />
      )}
    </div>
  );
};

const SearchResult = ({ query, filter, setSearch, _setSearch, setQuery }) => {
  const Query = query
    .toLowerCase()
    .replace(/(?<!\w)\s+(?!\w)|\s{2,}|\s+$/g, "");
  console.log(Query);
  const { favData } = useDataContext();
  const [_filter, setFilter] = useState(filter);
  // const [lowercase, setLowercase] = useState("");

  const [arrival, setArrival] = useState(false);
  FetchArrivals(setArrival);

  const [best, setBest] = useState(false);
  FetchBest(setBest);

  const [featured, setFeatured] = useState(false);
  FetchFeatured(setFeatured);

  const [searchResult, setSearchResult] = useState([]);
  const [database, setDatabase] = useState([]);
  useEffect(() => {
    if (arrival && best && featured) {
      setDatabase([arrival, best, featured]);
    }
  }, [arrival, best, featured]);

  useEffect(() => {
    const currentPageIndex = sessionStorage.getItem("menu");

    const SearchQuery = (data) => {
      const uniqueProductIds = new Set();
      const results = data.filter((product) => {
        // if (filter === "name") {
        //   setLowercase(product.name.toLowerCase());
        // } else if (filter === "tag") {
        //   setLowercase(product.tag.toLowerCase());
        // } else if (filter === "price") {
        //   setLowercase(product.price.toLowerCase());
        // } else {
        //   setLowercase(product.avail.toLowerCase());
        // }
        if (filter === "name") {
          if (
            product.name
              .toLowerCase()
              .split(" ")
              .some((word) => word.startsWith(Query)) &&
            !uniqueProductIds.has(product.name)
          ) {
            console.log(Query, product.name);
            uniqueProductIds.add(product.name);
            return true;
          }
        } else if (filter === "tag") {
          if (
            product.tag
              .toLowerCase()
              .split(" ")
              .some((word) => word.startsWith(Query)) &&
            !uniqueProductIds.has(product.name)
          ) {
            uniqueProductIds.add(product.name);
            return true;
          }
        } else if (filter === "price") {
          if (
            parseFloat(Query) < parseFloat(product.price) &&
            !uniqueProductIds.has(product.name)
          ) {
            uniqueProductIds.add(product.name);
            return true;
          }
        } else {
          if (
            product.avail.toLowerCase().includes(Query) &&
            !uniqueProductIds.has(product.name)
          ) {
            uniqueProductIds.add(product.name);
            return true;
          }
        }

        return false;
      });

      setSearchResult(results);
      console.log(results);
    };

    if (
      currentPageIndex < 3 &&
      database !== undefined &&
      database[currentPageIndex] !== undefined
    ) {
      SearchQuery(database[currentPageIndex]);
    } else if (
      (Array.isArray(arrival), Array.isArray(best), Array.isArray(featured))
    ) {
      const allDB = [...arrival, ...best, ...featured];
      SearchQuery(allDB);
    }
    console.log(filter);
  }, [Query, filter, database, arrival, best, featured]);

  return (
    <div className="search-result-container">
      <div className="search-title">
        {searchResult.length > 0
          ? `Search ${
              searchResult.length > 1 ? "Results" : "Result"
            } for '${query}'`
          : `No Result for '${query}'`}
      </div>
      <div className="search-result">
        {searchResult.map((data, _) => (
          <div
            className="search-results"
            onClick={() => {
              setSearch(false);
              _setSearch(false);
              setQuery("");
            }}
          >
            <CollectionCard data={data} ispreview={false} />
          </div>
        ))}
      </div>
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
        filter(label);
        selectMenu(e);
      }}
    >
      <i class={icon}></i>
      <span>{label}</span>
    </div>
  );
};
