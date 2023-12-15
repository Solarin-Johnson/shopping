import { CollectionTab } from "../../components/collection/collection";
import Navigation from "../../components/navigation/navigation";
import './arrivals.scss'

export default function Arrivals() {
  const arrival = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  sessionStorage.setItem("menu", 0);
  return (
    <div className="arrivals-container">
      <Navigation home={false}/>
      <CollectionTab tab={"New Arrivals"} products={arrival} />
    </div>
  );
}
