import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store/slices/cartSlice";

export const Popup = ({ cartDetails }) => {
  const isOpenCart = useSelector((state) => state.cart.isOpenCart);
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      isOpenCart &&
      popupRef.current &&
      !popupRef.current.contains(event.target)
    ) {
      dispatch(toggleCart());
    }
  };

  useEffect(() => {
    if (isOpenCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenCart, dispatch]);

  return (
    <span ref={popupRef}>
      {cartDetails?.isOpenCart && (
        <div className="cart-list">
          {Object.values(cartDetails?.cart)?.map((c) => {
            return (
              <div key={c.value.id} className="cart-item">
                <span>{c.value.title}</span>
                <span>{c.quantity}</span>
              </div>
            );
          })}
        </div>
      )}
    </span>
  );
};
