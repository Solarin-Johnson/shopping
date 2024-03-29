import { useEffect, useRef, useState } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cart from "../cart";
import { SearchBox } from "../search";

export default function Navigation({ type, title, cart }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [scrollUp, setScrollUp] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchX, setSearchX] = useState();

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
  const body = document.body;
  const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode")));

  if (mode !== null && mode !== undefined) {
    if (mode === "dark") {
      body.classList.add("dark-mode");
    }
  } else {
    localStorage.setItem("mode", JSON.stringify("light"));
    setMode("light");
  }

  const toggleMode = () => {
    if (body) {
      if (mode === "light") {
        setMode("dark");
        localStorage.setItem("mode", JSON.stringify("dark"));
      } else {
        setMode("light");
        localStorage.setItem("mode", JSON.stringify("light"));
      }
      body.classList.toggle("dark-mode");
    }
  };

  if (NavRef.current) {
    setTimeout(() => {
      setSearchX(NavRef.current.lastChild.getBoundingClientRect().left);
    }, 100);
  }

  useEffect(() => {
    const handleResize = () => {
      setSearchX(NavRef.current.lastChild.getBoundingClientRect().left);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSearchX]);

  const menuArray = [
    { icon: "fas fa-house", name: "Home", path: "/" },
    {
      icon: "material-symbols-outlined",
      name: mode === "light" ? "dark mode" : "light mode",
      iconName: mode === "light" ? "dark_mode" : "light_mode",
    },
    { icon: "fas fa-magnifying-glass", name: "Search" },
  ];

  return (
    <div className="nav" ref={NavRef}>
      {menuArray.map((data, i) => (
        <MenuItems key={i} data={data} i={i + 5} toggleMode={toggleMode} />
      ))}
    </div>
  );
}

export function MenuItems({ data, i, toggleMode }) {
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
      onClick={(e) => {
        selectMenu(e, i, data.path);
        i === 6 && toggleMode();
      }}
      className={`menu-items ${i === currentMenu && "menu-active"}`}
      key={i}
    >
      {loading ? (
        <Skeleton className="menu-items-icon-skeleton" />
      ) : (
        <i className={data.icon}>{data.iconName || ""}</i>
      )}
      {loading ? (
        <Skeleton className="menu-items-text-skeleton" />
      ) : (
        <span>{data.name}</span>
      )}
    </button>
  );
}
