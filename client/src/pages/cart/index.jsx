import { useEffect, useRef, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import "./wishlist.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WishList() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const [sumTotal, setSumTotal] = useState(0);

  const total = (data) => {
    setSumTotal(data);
  };

  return (
    <div className="cart-container">
      <Navigation type={false} title={"Cart"} cart={true} />
      <div className="wishlist-container">
        <div className="wishlist-data">
          <div className="wishlist-data-container">
            {loading ? (
              <>
                <Skeleton className="wishlist-card-skeleton" />
                <Skeleton className="wishlist-card-skeleton" />
              </>
            ) : (
              <>
                <WishlistCard
                  product={"Product Name"}
                  price={30000}
                  items={3}
                  total={total}
                />
                <WishlistCard />
                <WishlistCard />
                <WishlistCard />
                <WishlistCard />
                <WishlistCard />
                <WishlistCard />
              </>
            )}
          </div>
          <div className="wishlist-button">
            <div className="sub-total">
              <span>Sum Total</span>
              <span>320,000 NGN</span>
            </div>
            <div className="place-order">
              Place Order <span className="fas fa-arrow-right"></span>
            </div>
          </div>
        </div>
        <div className="wishlist-preview"></div>
      </div>
    </div>
  );
}

export const WishlistCard = ({ product, price, items, total }) => {
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
    if (total) {
      total(itemsNumber * Number(price));
    }
  }, [itemsNumber, total, price]);

  const minus = () => {
    if (Number(itemsNumber) > 1) {
      setItemsNumber(itemsNumber - 1);
    }
  };

  const plus = () => {
    if (Number(itemsNumber) + 1 <= items) {
      setItemsNumber(itemsNumber + 1);
    }
  };

  return (
    <div className="wishlist-card">
      <div className="wishlist-card-image"></div>
      <div className="wishlist-card-product">{product}</div>
      <div className="wishlist-card-price">{price} NGN</div>
      <div className="wishlist-card-items" ref={itemsRef}>
        <div className="minus" onClick={minus}>
          <i class="fa-solid fa-minus"></i>
        </div>
        <div className="value">{itemsNumber}</div>
        <div className="plus" onClick={plus}>
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="wishlist-card-delete">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};
