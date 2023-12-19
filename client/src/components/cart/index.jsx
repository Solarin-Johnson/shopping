import { useEffect, useState } from "react";
import "./cart.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FetchCart } from "../utils";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const [cart, setCart] = useState();
  FetchCart(setCart);

  return (
    <button className="cart">
      {!loading ? (
        <div className="cart-icon">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      ) : (
        <Skeleton className="cart-icon-skeleton" />
      )}
    </button>
  );
}
