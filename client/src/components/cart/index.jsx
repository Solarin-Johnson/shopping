import { useEffect, useState } from "react";
import "./cart.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });
  return (
    <div className="cart">
      {!loading ? (
        <div className="cart-icon">
          <i class="fa-solid fa-cart-shopping"></i>
        </div>
      ) : (
        <Skeleton className="cart-icon-skeleton" />
      )}
    </div>
  );
}
