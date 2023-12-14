import { useState } from "react";
import "./display.scss";
export default function Display() {
  return (
    <div className="display">
      <div className="display-card">
        <DisplayCard
          tag="Beauty"
          avail="New"
          name="Product Name"
          price="$32.95"
          desc="Discover Peak Comfort: Our CloudSoft Pillows redefine luxury sleep. Plush and breathable, they cradle your head in perfect comfort. Elevate your sleep experience with CloudSoft – where coziness meets quality"
        />
      </div>
      <div className="display-image"></div>
    </div>
  );
}

export function DisplayCard({
  tag,
  avail,
  name,
  price,
  desc,
  favourite,
  wish,
}) {
  const [fav, setFav] = useState(favourite);
  const [wished, setWished] = useState(wish);
  const [notify, setNotify] = useState(false);
  const like = () => {
    setFav(!fav);
    setNotify(`Product ${!fav ? "added to" : "removed from"} Favorites`);
    stopInterval();
  };
  const wishlist = () => {
    setWished(!wished);
    setNotify(`Product ${!wished ? "added to" : "removed from"} Wishlist`);
    stopInterval();
  };

  const stopInterval = () => {
    setTimeout(() => {
      setNotify(false);
    }, 4000);
  };

  return (
    <>
      <div className="display-card-label">
        <div className="display-card-tag">{tag}</div>
        <div className="display-card-avail">{avail}</div>
      </div>
      <div className="display-card-name">{name}</div>
      <div className="display-card-price">{price}</div>
      <div className="display-card-desc">{desc}</div>
      <div className="display-card-btn">
        <div className="favorite" id={fav ? "liked" : ""} onClick={like}>
          <i class={`${fav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
        </div>
        <div
          className="wishlist"
          id={wished ? "wished" : ""}
          onClick={wishlist}
        >
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
      {notify && <div className="display-card-notify">{notify}</div>}
    </>
  );
}
