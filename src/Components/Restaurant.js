import React, {useState, useEffect} from 'react';
import { useParams } from "react-router";

const Restaurant = () => {

    let resID = useParams().restarauntId;
    const [restaurantPage, setRestaurantPage] = useState([]);

    useEffect(() => {    

        (async () => {
            let response = await fetch("https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/restaurantDetails/"+resID)
            response = await response.json();
            console.log(response);
            setRestaurantPage(response.restaurantDetail)
        })()
    },[resID])

    return (
        <div className = "restaurantPage">
            <div className = "restaurantPage-about">
                <div className = "restaurantPage-info">
                    <h3>{restaurantPage.restaurantName}</h3>
                    <p>{restaurantPage.restaurantDescription}</p>
                    <p>{restaurantPage.openingHours}</p>
                    <p>{restaurantPage.contactNumber}</p>
                    <h3><a rel = "noreferrer" target = "_blank" href = {restaurantPage.websiteUrl}>{restaurantPage.websiteUrl}</a></h3>
                </div>
                <div className = "restaurantPage-image">
                    <img alt = "Restaurant Pics" src = {restaurantPage.restaurantImage} />
                </div>
            </div>
            <div className = "restaurantPage-menu">
                <h3>Menu</h3>
                <div className = "restaurantPage-cuisine">

                </div>
                <div className = "restaurantPage-dishes">

                </div>
            </div>
        </div>
    )
}

export {Restaurant};