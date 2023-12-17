import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./display.scss";
export default function Display() {
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setDisplayData({
        tag: "Beauty",
        avail: "New",
        name: "Product Name",
        price: "$32.95",
        desc: "Discover Peak Comfort: Our CloudSoft Pillows redefine luxury sleep. Plush and breathable, they cradle your head in perfect comfort. Elevate your sleep experience with CloudSoft - where coziness meets quality",
        img_url: "url",
      });
    }, 5000);
  });

  return (
    <div className="display">
      <div className="display-card">
        <DisplayCard
          tag={displayData.tag}
          avail={displayData.avail}
          name={displayData.name}
          price={displayData.price}
          desc={displayData.desc}
        />
      </div>
      {displayData.img_url ? (
        <div className="display-image"></div>
      ) : (
        <Skeleton className="display-image-skeleton" />
      )}
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
        {tag ? (
          <div className="display-card-tag">{tag}</div>
        ) : (
          <Skeleton className="display-card-label-skeleton" />
        )}
        {avail ? (
          <div className="display-card-avail">{avail}</div>
        ) : (
          <Skeleton className="display-card-label-skeleton" />
        )}
      </div>
      <div className="display-card-name">
        {name || <Skeleton className="display-card-name-skeleton" />}
      </div>
      <div className="display-card-price">
        {price || <Skeleton className="display-card-price-skeleton" />}
      </div>
      <div className="display-card-desc">
        {desc || <Skeleton className="display-card-desc-skeleton" count={3} />}
      </div>
      <div className="display-card-btn">
        <div className="favorite" id={fav ? "liked" : ""} onClick={like}>
          {name ? (
            <i class={`${fav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
          ) : (
            <Skeleton className="btn-skeleton" />
          )}
        </div>
        <div
          className="wishlist"
          id={wished ? "wished" : ""}
          onClick={wishlist}
        >
          {name ? (
            <i class="fa-solid fa-cart-shopping"></i>
          ) : (
            <Skeleton className="btn-skeleton" />
          )}
        </div>
      </div>
      {notify && <div className="display-card-notify">{notify}</div>}
    </>
  );
}
