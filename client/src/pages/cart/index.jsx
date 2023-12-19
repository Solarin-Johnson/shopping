import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import "./wishlist.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WishList() {
  return (
    <div className="cart-container">
      <Navigation home={false} title={"Cart"} />
      <div className="wishlist-container">
        <div className="wishlist-data">
          <div className="wishlist-data-container">
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
            <WishlistCard />
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

export const WishlistCard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className="wishlist-card-skeleton" />
      ) : (
        <div className="wishlist-card"></div>
      )}
    </>
  );
};
