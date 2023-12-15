import { useEffect, useState } from "react";
import "./navigation.scss";
export default function Navigation() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setScrollUp(
        currentPosition > scrollPosition &&
          currentPosition > window.innerHeight - 190
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, scrollUp]);
  return (
    <div className="navigation" id={!scrollUp ? "" : "slide-up"}>
      <div className="logo"></div>
      <Menu />
    </div>
  );
}

export function Menu() {
  const menuArray = [
    { icon: "fas fa-bolt", name: "New Arrivals" },
    { icon: "fas fa-star", name: "Best Selling" },
    { icon: "fas fa-trophy", name: "Featured" },
    { icon: "fas fa-heart", name: "Favourites" },
  ];
  const selectMenu = (e, i) => {
    const siblings = Array.from(e.currentTarget.parentElement.children).filter(
      (child) => child !== e.currentTarget
    );

    siblings.forEach((sibling) => {
      sibling.classList.remove("menu-active");
    });
    e.currentTarget.classList.add("menu-active");
    navigateMenu(i);
  };

  const navigateMenu = (i) => {
    let element = document
      .querySelectorAll(".collections-tab")
      [i].getBoundingClientRect();
    let element_alt = document.querySelectorAll(".collections")[0];
    if (element && window.innerWidth > 500) {
      window.scrollTo({
        top: element.top + window.pageYOffset - 40,
        behavior: "smooth",
      });
    } else if (element_alt && window.innerWidth <= 500) {
      window.scrollTo({
        top: element.top + window.pageYOffset - 50,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="menu">
      {menuArray.map((data, i) => (
        <div
          onClick={(e) => selectMenu(e, i)}
          className={`menu-items ${i === 0 && "menu-active"}`}
          key={i}
        >
          <i className={data.icon}></i>
          <span>{data.name}</span>
        </div>
      ))}
    </div>
  );
}
