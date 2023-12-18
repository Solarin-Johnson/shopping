import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./display.scss";
import { FetchDisplayData, Scan, compareObj } from "../utils";
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
  useEffect(() => {
    const favourite = JSON.parse(localStorage.getItem("favorite"));
    if (!loading && favourite !== null) {
      favourite.map((obj) => obj.name).includes(data.name)
        ? setFav(true)
        : setFav(false);
    }
  }, [data, loading]);

  console.log(fav);

  const like = () => {
    if (!loading) {
      setNotify(`Product ${!fav ? "added to" : "removed from"} Favorites`);
      stopInterval();
      const favourite = JSON.parse(localStorage.getItem("favorite"));
      if (fav) {
        const updated = favourite.filter((item) => item.name !== data.name);
        console.log(updated);
        localStorage.setItem("favorite", JSON.stringify(updated));
        setFav(false);
      } else {
        if (favourite.length > 0) {
          const updated = favourite.filter((item) => item.name !== data.name);
          localStorage.setItem("favorite", JSON.stringify([...updated, data]));
        } else {
          localStorage.setItem(
            "favorite",
            JSON.stringify([...favourite, data])
          );
        }
        setFav(true);
      }
      // if (!fav) {
      //   favourite.length > 0
      //     ? favourite.map((item, x) => {
      //         if (compareObj(data, item)) {
      //           const indexToRemove = favourite.findIndex(
      //             (items) => items === item
      //           );
      //           if (indexToRemove !== -1) {
      //             favourite.splice(indexToRemove, 1);
      //           }
      //         } else {
      //           localStorage.setItem(
      //             "favorite",
      //             JSON.stringify([...favourite, data])
      //           );
      //         }
      //       })
      //     : localStorage.setItem("favorite", JSON.stringify([data]));
      // } else {
      //   favourite.length <= 1 &&
      //     localStorage.setItem("favorite", JSON.stringify([]));
      // }
      // let updated = favourite.filter((item) => compareObj(item, data));
      // favourite.length > 1
      //   ? localStorage.setItem("favorite", JSON.stringify(updated))
      //   : localStorage.setItem("favorite", JSON.stringify([data]));
      // console.log(updated);
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
            <button>
              <i class={`${fav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
            </button>
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
            <button>
              <i class="fa-solid fa-cart-shopping"></i>{" "}
            </button>
          ) : (
            <Skeleton className="btn-skeleton" />
          )}
        </div>
      </div>
      {notify && <div className="display-card-notify">{notify}</div>}
    </>
  );
}
