import React from 'react';

function RestaurantItem(props){

    let restaurantStatus = ""
    if(props.itemData.isOpen){
        restaurantStatus = "Open Now"
    } else {
        restaurantStatus = "Closed"
    }

    return (
        <div key = {props.itemData.id}  className = "restaurant-item">
            <div className = "restaurant-item-image">
                <img alt = "restaurant-pic" src = {props.itemData.restaurantImage} />
            </div>
            <div className = "restaurant-item-details">
                <h3 className = "restaurant-item-name">{props.itemData.restaurantName}</h3>
                <h3 className = "restaurant-item-status">{restaurantStatus}</h3>
                <p className = "restaurant-item-description">{props.itemData.restaurantDescription}</p>
            </div>
        </div>
    );
}

export { RestaurantItem }