import { useCallback, useEffect, useRef, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import "./wishlist.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FetchCart } from "../../components/utils";
import { useNavigate } from "react-router-dom";

export default function WishList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState();
  const [sumTotal, setSumTotal] = useState(0);
  // const [prices, setPrices] = useState([]);
  const [PreviewIndex, setPreviewIndex] = useState(false);
  FetchCart(setWishlist);
  const prices = wishlist && wishlist.map((data) => parseFloat(data.price, 10));
  useEffect(() => {
    sessionStorage.setItem("prices", JSON.stringify(prices));
  }, [prices]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // useEffect(() => {
  //   if (prices) {

  //   }
  // }, [prices]);

  const total = (data, i) => {
    prices[i] = data;
    const sum = prices.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setSumTotal(sum);
  };

  const updateCart = (data) => {
    setWishlist(data);
    setTimeout(() => {
      setPreviewIndex(false);
    }, 10);
  };

  return (
    <div className="cart-container">
      <Navigation type={false} title={"Cart"} cart={true} />
      {wishlist !== undefined && wishlist.length > 0 ? (
        <div className="wishlist-container">
          <div className="wishlist-data">
            <div className="wishlist-data-container">
              {loading ? (
                <>
                  <Skeleton className="wishlist-card-skeleton" />
                </>
              ) : (
                <>
                  {wishlist.map((data, i) => (
                    <div
                      className="wishlist-card"
                      onClick={() => setPreviewIndex(i.toString())}
                    >
                      <WishlistCard
                        key={i}
                        product={data.name}
                        price={data.price}
                        items={3}
                        total={total}
                        index={i}
                        updateCart={updateCart}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="wishlist-button">
              <div className="sub-total">
                <span>Sum Total</span>
                <span>{`NGN ${sumTotal.toLocaleString()}`}</span>
              </div>
              <div className="place-order" onClick={() => navigate("/invoice")}>
                Place Order <span className="fas fa-arrow-right"></span>
              </div>
            </div>
          </div>
          <div className="preview">
            {PreviewIndex && wishlist[PreviewIndex] !== undefined ? (
              <PreviewIndexCard data={wishlist[PreviewIndex]} />
            ) : (
              <div className="preview-empty">
                Tap on a Product to Preview it Here
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmpyWishlistCard loading={loading} />
      )}
    </div>
  );
}

export const WishlistCard = ({
  product,
  price,
  items,
  total,
  index,
  updateCart,
}) => {
  const itemsRef = useRef(null);
  const [itemsNumber, setItemsNumber] = useState(1);
  useEffect(() => {
    const updateDivWidthAttribute = () => {
      const divWidth = itemsRef.current.parentElement.offsetWidth;
      if (divWidth < 500) {
        itemsRef.current.classList.add("small_items");
      } else {
        itemsRef.current.classList.remove("small_items");
      }
    };

    updateDivWidthAttribute();
    window.addEventListener("resize", updateDivWidthAttribute);

    return () => {
      window.removeEventListener("resize", updateDivWidthAttribute);
    };
  }, []);
  useEffect(() => {
    total(itemsNumber * Number(price), index);
  }, [itemsNumber, price, index, total]);

  const minus = (e) => {
    e.stopPropagation();
    if (Number(itemsNumber) > 1) {
      setItemsNumber(itemsNumber - 1);
    }
  };

  const plus = (e) => {
    e.stopPropagation();
    if (Number(itemsNumber) + 1 <= items) {
      setItemsNumber(itemsNumber + 1);
    }
  };

  const deleteItem = () => {
    const cartStore = JSON.parse(localStorage.getItem("cart")) || [];
    cartStore.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartStore));
    updateCart(cartStore);
  };

  return (
    <>
      <div className="wishlist-card-image"></div>
      <div className="wishlist-card-product">{product}</div>
      <div className="wishlist-card-price">{`NGN ${parseFloat(
        price,
        10
      ).toLocaleString()}`}</div>
      <div className="wishlist-card-items" ref={itemsRef}>
        <div className="minus" onClick={minus}>
          <i class="fa-solid fa-minus"></i>
        </div>
        <div className="value">{itemsNumber}</div>
        <div className="plus" onClick={plus}>
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="wishlist-card-delete" onClick={deleteItem}>
        <i class="fa-solid fa-xmark"></i>
      </div>
    </>
  );
};

export const EmpyWishlistCard = ({ loading }) => {
  return (
    <div className="wishlist-card-empty">
      {loading ? (
        <>
          <Skeleton className="wishlist-card-empty-skeleton" />
        </>
      ) : (
        <div> Oops! Looks like your cart is Empty </div>
      )}
    </div>
  );
};

export const PreviewIndexCard = ({ data }) => {
  return (
    <div className="preview-card">
      <div className="preview-card-image"></div>
      <div className="preview-card-label">
        <div className="preview-card-tag">{data.tag}</div>
        <div className="preview-card-avail">{data.avail}</div>
      </div>
      <div className="preview-card-name">{data.name}</div>
      <div className="preview-card-desc">{data.desc}</div>
    </div>
  );
};
