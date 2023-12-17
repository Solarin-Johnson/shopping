import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./display.scss";
import { FetchDisplayData, Scan } from "../utils";
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
        <DisplayCard data={displayData} loading={loading} />
      </div>
      {!loading ? (
        <div className="display-image"></div>
      ) : (
        <Skeleton className="display-image-skeleton" />
      )}
    </div>
  );
}

export function DisplayCard({ data, favourite, wish, loading }) {
  const [fav, setFav] = useState(favourite);
  const [wished, setWished] = useState(wish);
  const [notify, setNotify] = useState(false);
  const like = () => {
    if (!loading) {
      setFav(!fav);
      setNotify(`Product ${!fav ? "added to" : "removed from"} Favorites`);
      stopInterval();
    }
  };
  const wishlist = () => {
    if (!loading) {
      setWished(!wished);
      setNotify(`Product ${!wished ? "added to" : "removed from"} Wishlist`);
      stopInterval();
    }
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
          <div className="display-card-tag">{data.tag}</div>
        ) : (
          <Skeleton className="display-card-label-skeleton" />
        )}
        {!loading ? (
          <div className="display-card-avail">{data.avail}</div>
        ) : (
          <Skeleton className="display-card-label-skeleton" />
        )}
      </div>
      <div className="display-card-name">
        {!loading ? (
          data.name
        ) : (
          <Skeleton className="display-card-name-skeleton" />
        )}
      </div>
      <div className="display-card-price">
        {!loading ? (
          data.price
        ) : (
          <Skeleton className="display-card-price-skeleton" />
        )}
      </div>
      <div className="display-card-desc">
        {!loading ? (
          data.desc
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
