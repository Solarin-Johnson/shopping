import React, { useEffect, useState } from "react";
import "./collection.scss";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FetchArrivals, FetchBest, FetchFeatured } from "../utils";
import { useDataContext } from "../../DataContext";

export default function Collection() {
  const [arrival, setArrival] = useState(false);
  FetchArrivals(setArrival);

  const [best, setBest] = useState(false);
  FetchBest(setBest);

  const [featured, setFeatured] = useState(false);
  FetchFeatured(setFeatured);

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

export const CollectionCard = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const { handleDataChange } = useDataContext();
  const [displayData, setDisplayData] = React.useState();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  const preview = () => {
    setDisplayData(data);
    sessionStorage.setItem("display", JSON.stringify([data]));
  };
  useEffect(() => {
    handleDataChange(displayData);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [displayData, handleDataChange, data]);

  return (
    <div className="collections-card" onClick={preview}>
      {loading ? (
        <Skeleton className="collections-card-image-skeleton" />
      ) : (
        <div className="collections-card-image"></div>
      )}
      <div className="collections-card-content">
        {loading ? (
          <Skeleton className="collections-card-name-skeleton" />
        ) : (
          <div title="name" className="collections-card-name">
            {data.name}
          </div>
        )}
        {loading ? (
          <Skeleton className="collections-card-action-skeleton" />
        ) : (
          <div className="collections-card-action">
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        )}
      </div>
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
                <CollectionCard data={data} />
              ) : (
                i < 5 && <CollectionCard data={data} />
              )
            ) : (
              <CollectionCard data={data} />
            )
          )
        ) : (
          <EmptyCollectionCard />
        )}
      </div>
    </div>
  );
};
