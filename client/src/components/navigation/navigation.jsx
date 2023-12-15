import { useEffect, useState } from "react";
import "./navigation.scss";
import { useNavigate } from "react-router-dom";
export default function Navigation({ type, title }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);

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
      <Menu />
    </div>
  );
}

export function Menu() {
  const navigate = useNavigate();
  const menuArray = [
    { icon: "fas fa-bolt", name: "New Arrivals", path: "/arrivals" },
    { icon: "fas fa-star", name: "Best Selling", path: "/" },
    { icon: "fas fa-trophy", name: "Featured", path: "/" },
    { icon: "fas fa-heart", name: "Favourites", path: "/" },
  ];
  const selectMenu = (e, i, path) => {
    const siblings = Array.from(e.currentTarget.parentElement.children).filter(
      (child) => child !== e.currentTarget
    );

    siblings.forEach((sibling) => {
      sibling.classList.remove("menu-active");
    });
    e.currentTarget.classList.add("menu-active");
    navigateMenu(i);
    navigate(path);
  };

  const navigateMenu = (i) => {
    // let element = document
    //   .querySelectorAll(".collections-tab")
    //   [i].getBoundingClientRect();
    // let element_alt = document.querySelectorAll(".collections")[0];
    // if (element && window.innerWidth > 500) {
    //   window.scrollTo({
    //     top: element.top + window.pageYOffset - 40,
    //     behavior: "smooth",
    //   });
    // } else if (element_alt && window.innerWidth <= 500) {
    //   window.scrollTo({
    //     top: element.top + window.pageYOffset - 50,
    //     behavior: "smooth",
    //   });
    // }
  };
  const [currentMenu, setCurrentMenu] = useState(false);
  useEffect(() => {
    const menu = sessionStorage.getItem("menu") || false;
    if (menu) {
      setCurrentMenu(JSON.parse(menu));
    }
  }, []);
  return (
    <div className="menu">
      {menuArray.map((data, i) => (
        <div
          onClick={(e) => selectMenu(e, i, data.path)}
          className={`menu-items ${i === currentMenu && "menu-active"}`}
          key={i}
        >
          <i className={data.icon}></i>
          <span>{data.name}</span>
        </div>
      ))}
    </div>
  );
}
