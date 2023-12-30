import { useEffect, useRef, useState } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cart from "../cart";

export default function Navigation({ type, title, cart }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrollUp, setScrollUp] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchX, setSearchX] = useState();
  console.log(search);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setScrollUp(
        currentPosition > scrollPosition && type
          ? currentPosition > window.innerHeight - 190
          : false
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, scrollUp, type]);

  return (
    <>
      <SearchBox searchX={searchX} _setSearch={(data) => setSearch(data)} />
      {!cart && <Cart />}
      <div
        className={`navigation ${search && "remove_blur"}`}
        id={!scrollUp ? "" : "slide-up"}
      >
        <div className="logo"></div>
        <span className="navigation-title">
          {loading ? <Skeleton className="navigation-title-skeleton" /> : title}
        </span>
        <Nav setSearchX={(data) => setSearchX(data)} />
        <Menu />
      </div>
    </>
  );
}

export function Menu() {
  const menuArray = [
    { icon: "fas fa-bolt", name: "New Arrivals", path: "/arrivals" },
    { icon: "fas fa-star", name: "Best Selling", path: "/best-sellings" },
    { icon: "fas fa-trophy", name: "Featured", path: "/featured" },
    { icon: "fas fa-heart", name: "Favourites", path: "/favorite" },
  ];

  return (
    <div className="menu">
      {menuArray.map((data, i) => (
        <MenuItems key={i} data={data} i={i} />
      ))}
    </div>
  );
}

export function Nav({ setSearchX, clicked }) {
  const NavRef = useRef(null);

  if (NavRef.current) {
    setTimeout(() => {
      setSearchX(NavRef.current.lastChild.getBoundingClientRect().left);
    }, 100);
  }

  const handleResize = () => {
    setSearchX(NavRef.current.lastChild.getBoundingClientRect().left);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuArray = [
    { icon: "fas fa-house", name: "Home", path: "/" },
    { icon: "fas fa-magnifying-glass", name: "Search" },
  ];

  return (
    <div className="nav" ref={NavRef}>
      {menuArray.map((data, i) => (
        <MenuItems key={i} data={data} i={i + 5} />
      ))}
    </div>
  );
}

export function MenuItems({ data, i }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  const selectMenu = (e, i, path) => {
    // const siblings = Array.from(e.currentTarget.parentElement.children).filter(
    //   (child) => child !== e.currentTarget
    // );

    // siblings.forEach((sibling) => {
    //   sibling.classList.remove("menu-active");
    // });
    // e.currentTarget.classList.add("menu-active");
    navigate(path);
  };

  const [currentMenu, setCurrentMenu] = useState(false);
  useEffect(() => {
    const menu = sessionStorage.getItem("menu") || false;
    if (menu) {
      setCurrentMenu(JSON.parse(menu));
    }
  }, []);
  return (
    <button
      onClick={(e) => selectMenu(e, i, data.path)}
      className={`menu-items ${i === currentMenu && "menu-active"}`}
      key={i}
    >
      {loading ? (
        <Skeleton className="menu-items-icon-skeleton" />
      ) : (
        <i className={data.icon}></i>
      )}
      {loading ? (
        <Skeleton className="menu-items-text-skeleton" />
      ) : (
        <span>{data.name}</span>
      )}
    </button>
  );
}

export const SearchBox = ({ searchX, _setSearch }) => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchBoxRef = useRef(null);
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
    <>
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
      {query.length > 0 && <SearchResult query={query} />}
    </>
  );
};

const SearchResult = ({ query }) => {
  return (
    <div className="search-result-container">
      <div className="search-result"></div>
    </div>
  );
};
