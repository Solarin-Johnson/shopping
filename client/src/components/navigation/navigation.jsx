import { useEffect, useState } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
export default function Navigation({ type, title }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);

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
    <div className="navigation" id={!scrollUp ? "" : "slide-up"}>
      <div className="logo"></div>
      <div className="navigation-title">{title}</div>
      <Nav />
      <Menu />
    </div>
  );
}

export function Menu() {
  const menuArray = [
    { icon: "fas fa-bolt", name: "New Arrivals", path: "/arrivals" },
    { icon: "fas fa-star", name: "Best Selling", path: "/best-sellings" },
    { icon: "fas fa-trophy", name: "Featured", path: "/featured" },
    { icon: "fas fa-heart", name: "Favourites", path: "/" },
  ];

  return (
    <div className="menu">
      {menuArray.map((data, i) => (
        <MenuItems data={data} i={i} />
      ))}
    </div>
  );
}

export function Nav() {
  const menuArray = [
    { icon: "fas fa-house", name: "Home", path: "/" },
    { icon: "fas fa-magnifying-glass", name: "Search" },
  ];

  return (
    <div className="nav">
      {menuArray.map((data, i) => (
        <MenuItems data={data} i={i + 5} />
      ))}
    </div>
  );
}

export function MenuItems({ data, i }) {
  const navigate = useNavigate();
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
    <div
      onClick={(e) => selectMenu(e, i, data.path)}
      className={`menu-items ${i === currentMenu && "menu-active"}`}
      key={i}
    >
      <i className={data.icon}></i>
      <span>{data.name}</span>
    </div>
  );
}
