import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { toggleCart } from "./store/slices/cartSlice";
import { Popup } from "./commons/Popup";
import { Search } from "./commons/Search";

export const Layout = () => {
  const cartDetails = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header>
        <div className="wrapper">
          <h3 className="title">Cart App</h3>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact us</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
            </ul>
          </nav>
          <Search />
          <div className="profile">
            <span onClick={() => dispatch(toggleCart())}>
              {Object.keys(cartDetails.cart)?.length} 🛒{" "}
            </span>
            <Popup cartDetails={cartDetails} />
            <strong>Sapan</strong>
          </div>
        </div>
      </header>
      <main>
        <section>
          <Outlet />
        </section>
      </main>
      <footer>@copyright mine</footer>
    </div>
  );
};
