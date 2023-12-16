import { CollectionTab } from "../../components/collection/collection";
import Navigation from "../../components/navigation/navigation";
import "./path.scss";

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
  return (
    <Pages products={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} title={"New Arivals"} />
  );
}

export function Best() {
  sessionStorage.setItem("menu", 1);
  return (
    <Pages products={[1, 2, 3, 4, 5, 6, 7, 8]} title={"Best Sellings"} />
  );
}

export function Featured() {
  sessionStorage.setItem("menu", 2);
  return (
    <Pages products={[1, 2, 3, 4, 5, 6, 7, 8,9,10, 11, 12, 13]} title={"Featured"} />
  );
}
