import { useEffect, useRef, useState } from "react";
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
    }, 500);
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

export function DisplayCard({ data, wish, loading }) {
  const [animateCart, setAnimateCart] = useState(false);
  const { handleFavChange } = useDataContext();
  const [fav, setFav] = useState();
  const [wished, setWished] = useState(wish);
  const [notify, setNotify] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const parentBtn = useRef(null);

  useEffect(() => {
    document.addEventListener("scroll", () => setNotify(false));
    document.addEventListener("resize", () => setNotify(false));
    return () => {
      document.removeEventListener("scroll", () => setNotify(false));
      document.addEventListener("resize", () => setNotify(false));
    };
  }, []);

  useEffect(() => {
    const favourite = JSON.parse(localStorage.getItem("favorite"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!loading && favourite !== null && cart !== null) {
      favourite.map((obj) => obj.name).includes(data.name)
        ? setFav(true)
        : setFav(false);
      cart.map((obj) => obj.name).includes(data.name)
        ? setWished(true)
        : setWished(false);
    }
  }, [data, loading]);

  console.log(fav);

  const like = (e) => {
    const clean = parentBtn.current;
    if (!loading) {
      stopInterval();

      setNotify([
        `Product ${!fav ? "added to" : "removed from"} Favorites`,
        clean.getBoundingClientRect().left,
        clean.getBoundingClientRect().top + 20,
      ]);
      const favourite = JSON.parse(localStorage.getItem("favorite"));
      if (fav) {
        const updated = favourite.filter((item) => item.name !== data.name);
        console.log(updated);
        localStorage.setItem("favorite", JSON.stringify(updated));
        setFav(false);
        handleFavChange(updated);
      } else {
        if (favourite.length > 0) {
          const updated = favourite.filter((item) => item.name !== data.name);
          localStorage.setItem("favorite", JSON.stringify([...updated, data]));
          handleFavChange([...updated, data]);
        } else {
          localStorage.setItem(
            "favorite",
            JSON.stringify([...favourite, data])
          );
          handleFavChange([...favourite, data]);
        }
        zoomEffect(e);
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
  const wishlist = (e) => {
    const clean = parentBtn.current;
    if (!loading) {
      setNotify([
        `Product ${!wished ? "added to" : "removed from"} Wishlist`,
        clean.getBoundingClientRect().left + 50,
        clean.getBoundingClientRect().top + 20,
      ]);
      stopInterval();
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (wished) {
        const updated = cart.filter((item) => item.name !== data.name);
        console.log(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
        setWished(false);
        handleFavChange(updated);
        setAnimateCart(false);
      } else {
        if (cart.length > 0) {
          const updated = cart.filter((item) => item.name !== data.name);
          localStorage.setItem("cart", JSON.stringify([...updated, data]));
          handleFavChange([...updated, data]);
        } else {
          localStorage.setItem("cart", JSON.stringify([...cart, data]));
          handleFavChange([...cart, data]);
        }
        setAnimateCart(true);
        zoomEffect(e);
      }

      setWished(!wished);
    }
  };

  const zoomEffect = (e) => {
    const currentTarget = e.currentTarget;

    if (currentTarget) {
      currentTarget.classList.add("zoomEffect");

      setTimeout(() => {
        currentTarget.classList.remove("zoomEffect");
      }, 200);
    }
  };

  const stopInterval = () => {
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        setNotify(false);
      }, 3000)
    );
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
          `${Number(parseFloat(data.price).toFixed(2)).toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}`
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
      <div className="display-card-btn" ref={parentBtn}>
        <div
          className="wishlist"
          id={wished ? "wished" : ""}
          onClick={wishlist}
        >
          {!loading ? (
            <button>{(wished && "Remove from") || "Add to"} cart</button>
          ) : (
            <Skeleton className="btn-skeleton" />
          )}
        </div>
        <div className="favorite" id={fav ? "liked" : ""} onClick={like}>
          {!loading ? (
            <button>
              <i class={`${fav ? "fa-solid" : "fa-regular"} fa-heart`}></i>
            </button>
          ) : (
            <Skeleton className="btn-skeleton" />
          )}
        </div>
        {notify && (
          <div
            className="display-card-notify"
            style={{
              left: window.innerWidth > 800 && notify[1],
              top: window.innerWidth > 800 && notify[2],
            }}
          >
            {notify[0]}
          </div>
        )}
      </div>
    </>
  );
}

export const CartEffect = ({ wished }) => {
  const effectRef = useRef(null);
  const [cartX, setCartX] = useState([0, 0]);
  const [cartEndX, setCartEndX] = useState([0, 0]);
  useEffect(() => {
    const handleResize = () => {
      const cartEnd = document.querySelectorAll(".cart")[0];
      if (effectRef.current) {
        const siblings = effectRef.current.parentElement.firstChild;
        setCartX([
          siblings.getBoundingClientRect().left,
          siblings.getBoundingClientRect().top,
        ]);
      }
      if (cartEnd && wished) {
        setCartX([
          cartEnd.getBoundingClientRect().left + 10,
          cartEnd.getBoundingClientRect().top + 10,
        ]);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [wished]);

  return (
    <div
      className={`cart-effect ${
        wished ? "show-cart-effect" : "hide-cart-effect"
      }`}
      ref={effectRef}
      style={{ top: cartX[1] + "px", left: cartX[0] + "px" }}
    >
      <i class="fa-solid fa-cart-shopping"></i>
    </div>
  );
};
