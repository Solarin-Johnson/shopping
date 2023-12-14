import "./collection.scss";
export default function Collection() {
  const arrival = [1, 2, 3, 4, 5];
  const best = [1, 2, 3, 4, 5, 6, 7];
  const featured = [1, 2, 3, 4];
  const favorite = [];
  return (
    <div className="collections">
      <div id="arrivals" className="collections-tab">
        <div className="collections-tab-head">New Arrivals</div>
        <div className="collections-tab-body">
          {arrival.map((data, i) => (
            <CollectionCard name={"Product Name"} />
          ))}
        </div>
      </div>
      <div id="best" className="collections-tab">
        <div className="collections-tab-head">Best Sellings</div>
        <div className="collections-tab-body">
          {best.map((data, i) => (
            <CollectionCard name={"Product Name"} />
          ))}
        </div>
      </div>
      <div id="featured" className="collections-tab">
        <div className="collections-tab-head">Featured</div>
        <div className="collections-tab-body">
          {featured.map((data, i) => (
            <CollectionCard name={"Product Name"} />
          ))}
        </div>
      </div>
      <div id="favourites" className="collections-tab">
        <div className="collections-tab-head">Favorites</div>
        <div className="collections-tab-body">
          {favorite.length > 0 ? (
            favorite.map((data, i) => <CollectionCard name={"Product Name"} />)
          ) : (
            <EmptyCollectionCard />
          )}
        </div>
      </div>
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
