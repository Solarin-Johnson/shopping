import { useEffect, useState } from "react";
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

  return (
    <div className="cart-container">
      <Navigation home={false} title={"Cart"} />
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

export const WishlistCard = ({ product, price, items }) => {
  return (
    <div className="wishlist-card">
      <div className="wishlist-card-image"></div>
      <div className="wishlist-card-product">{product}</div>
      <div className="wishlist-card-price">{price} NGN</div>
      <div className="wishlist-card-items"></div>
      <div className="wishlist-card-delete">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
  );
};
