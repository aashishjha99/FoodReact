import "../Comp/style.css";
import React, { useEffect, useState } from "react";
import { IMAGE_URL, RESTAURANT_LIST } from "../Utility/Constants";

const RestaurantCard = ({ name, cuisines, avgRating, cloudinaryImageId }) => {
  return (
    <div className="card">
      <div className="card-details">
        <img alt="items-view" src={IMAGE_URL + cloudinaryImageId}></img>
        <h2>{name}</h2>
        <h3>{cuisines.join("  , ")}</h3>
        <h4>{avgRating}</h4>
      </div>
    </div>
  );
};

// function filterData(searchText, restaurant) {
//   return restaurant.filter((rest) => rest.data.name.includes(searchText));
// }

const filterdData = (searchText, restaurant) =>
  restaurant.filter((rest) => rest.data.name.includes(searchText));

export default function Body() {
  const [restaurant, setRestaurant] = useState(RESTAURANT_LIST);
  const [searchText, setSearchText] = useState("");

  // once after render if dependency array is empty
  // [searchText] depedency array  : once after render and after every rerenders when text changes
  useEffect(() => {
    console.log("use elllfevap[pka;pofdk;'oakd");
  }, [searchText]);

  console.log("render");

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="search-btn"
          onClick={() => {
            const filteredRestaurant =
              searchText.length === 0 && searchText != null
                ? RESTAURANT_LIST
                : filterdData(searchText, restaurant);
            setRestaurant(filteredRestaurant);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurantList">
        {restaurant.map((rest) => {
          return <RestaurantCard {...rest.data} />;
        })}
      </div>
    </>
  );
}
