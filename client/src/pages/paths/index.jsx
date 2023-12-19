import { useEffect, useState } from "react";
import { CollectionTab } from "../../components/collection/collection";
import Navigation from "../../components/navigation/navigation";
import "./path.scss";
import {
  FetchArrivals,
  FetchBest,
  FetchFavorite,
  FetchFeatured,
} from "../../components/utils";

export default function Pages({ products, title, msg }) {
  return (
    <div className="pages-container">
      <Navigation home={false} title={title} />
      <CollectionTab products={products} msg={msg} />
    </div>
  );
}

export function Arrivals() {
  sessionStorage.setItem("menu", 0);
  const [data, setData] = useState(false);
  FetchArrivals(setData);
  return <Pages products={data} title={"New Arivals"} />;
}

export function Best() {
  const [data, setData] = useState(false);
  FetchBest(setData);

  sessionStorage.setItem("menu", 1);
  return <Pages products={data} title={"Best Sellings"} />;
}

export function Featured() {
  const [data, setData] = useState(false);
  FetchFeatured(setData);
  sessionStorage.setItem("menu", 2);
  return <Pages products={data} title={"Featured"} />;
}

export function Favorite() {
  const [data, setData] = useState(false);
  FetchFavorite(setData);
  sessionStorage.setItem("menu", 3);
  return (
    <Pages
      products={data}
      title={"Favorites"}
      msg={["Your Favorites List is Empty ", <strong> Add Some! </strong>]}
    />
  );
}
