import "../Comp/style.css";

import React, { useEffect, useState } from "react";

import { IMAGE_URL, RESTAURANT_LIST, SWIGGY_API } from "../Utility/Constants";

const RestaurantCard = ({
  name,
  cuisines,
  avgRating,
  cloudinaryImageId,
  areaName,
}) => {
  return (
    <div className="card">
      <div className="card-details">
        <img alt="items-view" src={IMAGE_URL + cloudinaryImageId}></img>
        <h2>{name}</h2>
        <h3>{cuisines.join("  , ")}</h3>
        <h4>{areaName}</h4>
        <h4>{avgRating}</h4>
      </div>
    </div>
  );
};



const filterdData = (searchText, restaurant) =>
  restaurant.filter((rest) => rest.data.name.includes(searchText));


export default function Body() {
  const [restaurant, setRestaurant] = useState(RESTAURANT_LIST);
  const [searchText, setSearchText] = useState("");

  // once after render if dependency array is empty
  // [searchText] depedency array  : once after render and after every rerenders when text changes
  useEffect(() => {
    getDataFromSwiggy();
  }, []);



  async function getDataFromSwiggy() {
    try {
      const response = await fetch(SWIGGY_API);
      const data = await response.json();

      async function getResataurantDataFromJson(jsondata) {
        for (let index = 0; index < jsondata?.data?.cards?.length; index++) {
          let checkData =
            jsondata?.data?.cards[index]?.card?.card?.gridElements
              ?.infoWithStyle?.restaurants;

          if (checkData && typeof checkData !== "undefined") {
            return checkData;
          }
        }
      }


      const resData = await getResataurantDataFromJson(data);

      setRestaurant(resData);
    } catch (error) {
      console.log(error);
    }
  }

  
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
        {restaurant?.map((rest) => {
          return <RestaurantCard {...rest?.info} />;
        })}
      </div>
    </>
  );
}
