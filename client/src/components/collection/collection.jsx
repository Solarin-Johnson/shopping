import "./collection.scss";
import { useInView } from "react-intersection-observer";
export default function Collection() {
  const arrival = [1, 2, 3, 4, 5];
  const best = [1, 2, 3, 4, 5, 6, 7];
  const featured = [1, 2, 3, 4];
  const favorite = [];
  return (
    <div className="collections">
      <CollectionTab tab={"New Arrivals"} products={arrival} />
      <CollectionTab tab={"Best Sellings"} products={best} />
      <CollectionTab tab={"Featured"} products={featured} />
      <CollectionTab tab={"Favorites"} products={favorite} />
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

export const CollectionTab = ({ i, tab, products }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  return (
    <div id="arrivals" ref={ref} className="collections-tab">
      <div className="collections-tab-head">{tab}</div>
      <div className="collections-tab-body">
        {products.length > 0 ? (
          products.map(
            (data, i) => i < 6 && <CollectionCard name={"Product Name"} />
          )
        ) : (
          <EmptyCollectionCard />
        )}
      </div>
    </div>
  );
};
