import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../hooks/debounce";
import { searchItem } from "../store/slices/cartSlice";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchItems = useSelector((state) => state.cart.searchItems);
  const dispatch = useDispatch();
  const debouncedInputValue = useDebounce(inputValue, 500);
  const inputRef = useRef(null);

  useEffect(() => {
    if (debouncedInputValue) {
      dispatch(searchItem(debouncedInputValue));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedInputValue, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={inputRef}>
      <input
        type="text"
        className={`typeahead ${showSuggestions ? "clear-bottom-radius" : ""}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {showSuggestions && (
        <div className="suggestions">
          {searchItems?.map((val) => (
            <div key={val.id}>{val.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};
