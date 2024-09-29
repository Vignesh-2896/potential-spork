import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import Dishes from "../assets/RestaurantDishes.json";
import { MenuItem } from "./ItemBox";
import { SideMenu, ShowMenu } from "./SideMenu";
import HamburgerIcon from "../assets/icons8-menu-48.png";
import TimeIcon from "../assets/icons8-time-24.png";
import CallIcon from "../assets/icons8-call-24.png";
import WebsiteIcon from "../assets/icons8-website-24.png";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Restaurant = () => {
  let resID = useParams().restarauntId;
  const [restaurantData, setRestaurantData] = useState([]); // State to hold the basic restaurant data.
  const [restaurantCategory, setRestaurantCategory] = useState(["All"]); // State to hold the available categories in the restaurant.
  const [allowedDishes, setAllowedDishes] = useState([]); // State to hold the dishes available for the restaurant.
  const [isLoading, setIsLoading] = useState(true); // State to check if Loading is complete.
  const [isError, setIsError] = useState(false); // State to handle error in fetching data.

  let AllDishesData = useRef("");

  useEffect(() => {
    (async () => {
      let response = await fetch(
        "https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/restaurantDetails/" +
          resID
      );
      response = await response.json(); // Find the restaurant's data based on the ID passed.
      if (!response.errors) {
        setRestaurantData(response.restaurantDetail);
        updateRestaurantCategory(Dishes.restaurantDishes);
        updateAllowedDishes(Dishes.restaurantDishes);

        AllDishesData.current = Dishes.restaurantDishes; // Variable to hold all the Dishes data.

        setIsLoading(false);

        if (document.getElementsByClassName("categoryItem")[0])
          document
            .getElementsByClassName("categoryItem")[0]
            .classList.add("active");
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, [resID]);

  let updateRestaurantCategory = (CategoryList) => {
    // Function to add the available categories for the restaurant.

    let tempList = ["All"];
    CategoryList.forEach(function (item) {
      let restaurantsAllowed = item.restaurantName;
      if (restaurantsAllowed.indexOf(resID) !== -1) {
        if (tempList.indexOf(item.itemCategory) === -1) {
          tempList.push(item.itemCategory);
        }
      }
    });
    setRestaurantCategory(tempList);
  };

  let updateAllowedDishes = (DishesList) => {
    // Function to add the allowed dishes in the restaurant.

    DishesList.forEach(function (item) {
      let restaurantsAllowed = item.restaurantName;
      if (restaurantsAllowed.indexOf(resID) !== -1)
        setAllowedDishes((arr) => [
          ...arr,
          <MenuItem key={item.id} itemData={item} />,
        ]);
      // The dishes for whom the restaurant ID is same as our current restaurant, will be displayed.
    });
  };

  let filterWithCategory = (e) => {
    // Filter the available dishes based on Food Category.
    let requiredCategory = e.target.innerHTML;
    let tmpDishesList = [];
    setAllowedDishes([]);

    clearActive();
    e.target.className += " active";

    if (requiredCategory !== "All") {
      AllDishesData.current.forEach(function (item) {
        if (
          item.itemCategory === requiredCategory &&
          tmpDishesList.indexOf(item) === -1
        )
          tmpDishesList.push(item);
        // Each dish item whose Category and Restaurant ID are as required will be displayed.
      });
    } else {
      tmpDishesList = AllDishesData.current;
    }
    updateAllowedDishes(tmpDishesList);
  };

  let clearActive = () => {
    let elementList = document.getElementsByClassName("categoryItem");
    for (let item of elementList) item.classList.remove("active");
  };

  return (
    <div>
      {isError ? (
        <h3 className="restaurant-error">
          No Restaurant Found ! Way back home is <Link to="/">Here !</Link>{" "}
        </h3>
      ) : (
        <div>
          {isLoading ? ( // If Fetch has not been complete, a Loading animation will be displayed.
            <div className="loaderDiv">
              <InfinitySpin
                visible={true}
                color="#4fa94d"
                ariaLabel="infinity-spin-loading"
                height={120}
                width={120}
              />
            </div>
          ) : (
            // If Fetch has been completed, the required content will be displayed.
            <div>
              <span id="sideMenuBtn" className="sideMenuBtn" onClick={ShowMenu}>
                <img
                  style={{ marginTop: "5px" }}
                  alt="HamburgerIcon"
                  src={HamburgerIcon}
                />
              </span>
              <SideMenu />
              <div className="restaurantPage">
                <h1 className="applicationName">Food for Thoughts</h1>
                <h3 className="applicationDescription">
                  Find the food you are thinking about now !
                </h3>
                <div className="restaurantPage-about">
                  <div className="restaurantPage-info">
                    <h3 className="restaurantPage-info-name">
                      {restaurantData.restaurantName}
                    </h3>
                    <p className="restaurantPage-info-summary">
                      {restaurantData.restaurantDescription}
                    </p>
                    <p className="restaurantPage-info-opening">
                      <img
                        alt="Time Icon"
                        style={{ marginRight: "15px" }}
                        src={TimeIcon}
                      />
                      {restaurantData.openingHours}
                    </p>
                    <p className="restaurantPage-info-phone">
                      <img
                        alt="Call  Icon"
                        style={{ marginRight: "15px" }}
                        src={CallIcon}
                      />
                      {restaurantData.contactNumber}
                    </p>
                    <p className="restaurantPage-info-website">
                      <img
                        alt="Website Icon"
                        style={{ marginRight: "15px" }}
                        src={WebsiteIcon}
                      />
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={restaurantData.websiteUrl}
                      >
                        {restaurantData.websiteUrl}
                      </a>
                    </p>
                  </div>
                  <div className="restaurantPage-image">
                    <img
                      alt="Restaurant Pics"
                      src={restaurantData.restaurantImage}
                    />
                  </div>
                </div>
                <div className="restaurantPage-menu">
                  <h3>Categories</h3>
                  {restaurantCategory.map(function (item, index) {
                    // Iterating through each of the available categories.
                    return (
                      <button
                        key={index}
                        onClick={filterWithCategory}
                        className="categoryItem"
                      >
                        {item}
                      </button>
                    );
                  })}
                  <h3>Menu</h3>
                  <div className="restaurantPage-dishes">
                    {allowedDishes.map(function (item, index) {
                      // Iterating through each of the dishes based on filters.
                      return item;
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { Restaurant };
