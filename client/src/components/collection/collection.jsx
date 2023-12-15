import { useEffect, useState } from "react";
import "./collection.scss";
import { useInView } from "react-intersection-observer";
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
  return (
    <div className="collections-card">
      <div className="collections-card-image"></div>
      <div className="collections-card-name">{name}</div>
      <div className="collections-card-action">
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
};

export const EmptyCollectionCard = ({ name }) => {
  return (
    <div className="collections-card collections-card-empty">
      <div>Your Favorites List is Empty</div>
      <i class="fa-solid fa-plus"></i>
    </div>
  );
};

export const CollectionTab = ({ i, tab, products, preview }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
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
      <div className="collections-tab-head">{tab}</div>
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
