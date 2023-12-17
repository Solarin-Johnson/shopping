import { useEffect, useState } from "react";
import { CollectionTab } from "../../components/collection/collection";
import Navigation from "../../components/navigation/navigation";
import "./path.scss";
import { FetchArrivals, FetchBest, FetchFeatured, simulate } from "../../components/utils";

export default function Pages({ products, title }) {
  return (
    <div className="pages-container">
      <Navigation home={false} title={title} />
      <CollectionTab products={products} />
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
  return (
    <Pages
      products={data}
      title={"Featured"}
    />
  );
}
