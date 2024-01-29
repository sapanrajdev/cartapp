import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getAllItems } from "../store/slices/cartSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  return (
    <div className="home-container">
      {products?.map((d, index) => {
        return (
          <div key={d.id} className="cart-item">
            <h4>{d.title}</h4>{" "}
            <button onClick={() => dispatch(addItem(d))}>Add</button>
          </div>
        );
      })}
    </div>
  );
};
