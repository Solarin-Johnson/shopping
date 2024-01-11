import React, { useEffect, useState } from "react";
import "./collection.scss";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import {
  FetchArrivals,
  FetchBest,
  FetchFavorite,
  FetchFeatured,
} from "../utils";
import { useDataContext } from "../../DataContext";

export default function Collection() {
  const { favData } = useDataContext();

  const [arrival, setArrival] = useState(false);
  FetchArrivals(setArrival);

  const [best, setBest] = useState(false);
  FetchBest(setBest);

  const [featured, setFeatured] = useState(false);
  FetchFeatured(setFeatured);

  const [favorite, setFavorite] = useState(false);
  FetchFavorite(setFavorite);

  useEffect(() => {
    if (favData) {
      setFavorite(favData);
    }
  }, [favData]);

  return (
    <div className="collections">
      <CollectionTab
        tab={"New Arrivals"}
        products={arrival}
        preview={true}
        msg="No New Arrivals at the moment"
      />
      <CollectionTab
        tab={"Best Sellings"}
        products={best}
        preview={true}
        msg="No Best Selling Product at the moment"
      />
      <CollectionTab
        tab={"Featured"}
        products={featured}
        preview={true}
        msg="No Featured Product at the moment"
      />
      <CollectionTab
        tab={"Favorites"}
        products={favorite}
        preview={true}
        msg={["Your Favorites List is Empty ", <strong>Add Some! </strong>]}
      />
    </div>
  );
}

export const CollectionCard = ({ data, ispreview, i }) => {
  const [loading, setLoading] = useState(true);
  const { handleDataChange } = useDataContext();
  const [displayData, setDisplayData] = React.useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const preview = () => {
    setDisplayData(data);
    sessionStorage.setItem("display", JSON.stringify([data]));
    handleDataChange(data);
    !ispreview && navigate(`/home?productId=${i}`);
    window.scrollTo({ top: 0 });
  };

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
          <div
            title={data.name}
            onClick={(e) => e.stopPropagation()}
            className="collections-card-name"
          >
            {data.name}
          </div>
        )}
        {loading ? (
          <Skeleton className="collections-card-action-skeleton" />
        ) : (
          <button className="collections-card-action">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export const EmptyCollectionCard = ({ msg }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  return (
    <>
      {loading ? (
        <Skeleton className="collections-card-empty-skeleton" />
      ) : (
        <div className="collections-card collections-card-empty">
          <div>{msg}</div>
        </div>
      )}
    </>
  );
};

export const CollectionTab = ({ i, tab, products, preview, msg }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
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
                i < 14 && <CollectionCard data={data} preview i={i} />
              ) : (
                i < 5 && <CollectionCard data={data} preview i={i} />
              )
            ) : (
              <CollectionCard data={data} preview i={i} />
            )
          )
        ) : (
          <EmptyCollectionCard msg={msg} />
        )}
      </div>
    </div>
  );
};
