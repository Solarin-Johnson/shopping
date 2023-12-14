import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
      setScrollUp(currentPosition > scrollPosition && currentPosition > 480);
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
  const selectMenu = (e) => {
    const siblings = Array.from(e.currentTarget.parentElement.children).filter(
      (child) => child !== e.currentTarget
    );

    siblings.forEach((sibling) => {
      sibling.classList.remove("menu-active");
    });
    e.currentTarget.classList.add("menu-active");
  };

  return (
    <div className="menu">
      {menuArray.map((data, i) => (
        <div onClick={selectMenu} className="menu-items" key={i}>
          <i className={data.icon}></i>
          <span>{data.name}</span>
        </div>
      ))}
    </div>
  );
}
