import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./display.scss";
import { FetchDisplayData } from "../utils";
import { useDataContext } from "../../DataContext";
export default function Display() {
  const { sharedData } = useDataContext();
  const [displayData, setDisplayData] = useState("");
  const [loading, setLoading] = useState(true);
  FetchDisplayData(setDisplayData);
  useEffect(() => {
    if (sharedData) {
      setDisplayData(sharedData);
      console.log(sharedData);
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [sharedData]);

  return (
    <div className="display">
      <div className="display-card">
        <DisplayCard
          tag={displayData.tag}
          avail={displayData.avail}
          name={displayData.name}
          price={displayData.price}
          desc={displayData.desc}
          loading={loading}
        />
      </div>
      {!loading ? (
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
  loading,
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
        {!loading ? (
          <div className="display-card-tag">{tag}</div>
        ) : (
          <Skeleton className="display-card-label-skeleton" />
        )}
        {!loading ? (
          <div className="display-card-avail">{avail}</div>
        ) : (
          <Skeleton className="display-card-label-skeleton" />
        )}
      </div>
      <div className="display-card-name">
        {!loading ? name : <Skeleton className="display-card-name-skeleton" />}
      </div>
      <div className="display-card-price">
        {!loading ? (
          price
        ) : (
          <Skeleton className="display-card-price-skeleton" />
        )}
      </div>
      <div className="display-card-desc">
        {!loading ? (
          desc
        ) : (
          <Skeleton className="display-card-desc-skeleton" count={3} />
        )}
      </div>
      <div className="display-card-btn">
        <div className="favorite" id={fav ? "liked" : ""} onClick={like}>
          {!loading ? (
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
          {!loading ? (
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
