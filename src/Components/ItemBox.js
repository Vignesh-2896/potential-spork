import React from "react";

function RestaurantItem(props) {
  // A Reusable Element that will display a box with information about a Restaurant.

  let restaurantStatus = "";
  if (props.itemData.isOpen) {
    restaurantStatus = (
      <h3 className="restaurant-item-status-open">Open Now</h3>
    );
  } else {
    restaurantStatus = (
      <h3 className="restaurant-item-status-closed">Closed</h3>
    );
  }

  return (
    <div key={props.itemData.id} className="restaurant-item">
      <div className="restaurant-item-image">
        <img alt="restaurant-pic" src={props.itemData.restaurantImage} />
      </div>
      <div className="restaurant-item-details">
        <h3 className="restaurant-item-name">
          {props.itemData.restaurantName}
        </h3>
        {restaurantStatus}
        <p className="restaurant-item-description">
          {props.itemData.restaurantDescription}
        </p>
      </div>
    </div>
  );
}

function MenuItem(props) {
  // A Reusable Element that will display a box with information about a Dish.

  return (
    <div key={props.itemData.id} className="menu-item">
      <div className="menu-item-image">
        <img alt="menu-pic" src={props.itemData.itemImage} />
      </div>
      <div className="menu-item-details">
        <h3 className="menu-item-name">{props.itemData.itemName}</h3>
        <h3 className="menu-item-cost">{props.itemData.itemCost}</h3>
      </div>
    </div>
  );
}

export { RestaurantItem, MenuItem };
