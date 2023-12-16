import Cart from "../../components/cart";
import Collection from "../../components/collection/collection";
import Display from "../../components/display/display";
import Navigation from "../../components/navigation/navigation";

export default function Home() {
  sessionStorage.setItem("menu", 5);
  return (
    <>
      <Navigation type={true} />
      <Display />
      <Collection />
      <Cart />
    </>
  );
}
