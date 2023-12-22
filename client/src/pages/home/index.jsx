import Cart from "../../components/cart";
import Collection from "../../components/collection/collection";
import Display from "../../components/display/display";
import Navigation from "../../components/navigation/navigation";
import { FetchAll } from "../../components/utils";

export default function Home() {
  sessionStorage.setItem("menu", 5);
  FetchAll();
  return (
    <>
      <Navigation title={"E-Vendor"} type={true} />
      <Display />
      <Collection />
    </>
  );
}
