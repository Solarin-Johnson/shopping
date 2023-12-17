import { useEffect, useState } from "react";
import "./collection.scss";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Collection() {
  const arrival = [1, 2, 3, 4, 5];
  const best = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const featured = [1, 2, 3, 4];
  const favorite = [];
  return (
    <div className="collections">
      <CollectionTab tab={"New Arrivals"} products={arrival} preview={true} />
      <CollectionTab tab={"Best Sellings"} products={best} preview={true} />
      <CollectionTab tab={"Featured"} products={featured} preview={true} />
      <CollectionTab tab={"Favorites"} products={favorite} preview={true} />
    </div>
  );
}

export const CollectionCard = ({ name }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });
  return (
    <div className="collections-card">
      {loading ? (
        <Skeleton className="collections-card-image-skeleton" />
      ) : (
        <div className="collections-card-image"></div>
      )}
      {loading ? (
        <Skeleton className="collections-card-name-skeleton" />
      ) : (
        <div className="collections-card-name">{name}</div>
      )}
      {loading ? (
        <></>
      ) : (
        <div className="collections-card-action">
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      )}
    </div>
  );
};

export const EmptyCollectionCard = ({ name }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });
  return (
    <>
      {loading ? (
        <Skeleton className="collections-card-empty-skeleton" />
      ) : (
        <div className="collections-card collections-card-empty">
          <div>Your Favorites List is Empty</div>
         
        </div>
      )}
    </>
  );
};

export const CollectionTab = ({ i, tab, products, preview }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setBrowserWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="arrivals" ref={ref} className="collections-tab">
      <div className="collections-tab-head">
        {loading ? <Skeleton className="collections-tab-head-skeleton" /> : tab}
      </div>
      <div className="collections-tab-body">
        {products.length > 0 ? (
          products.map((data, i) =>
            preview ? (
              browserWidth > 1920 ? (
                <CollectionCard name={"Product Name"} />
              ) : (
                i < 5 && <CollectionCard name={"Product Name"} />
              )
            ) : (
              <CollectionCard name={"Product Name"} />
            )
          )
        ) : (
          <EmptyCollectionCard />
        )}
      </div>
    </div>
  );
};
