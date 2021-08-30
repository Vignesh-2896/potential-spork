import React, {useState, useEffect, useRef} from 'react';
import { useParams } from "react-router";
import Dishes from "../assets/RestaurantDishes.json"
import { MenuItem } from './ItemBox';

const Restaurant = () => {

    let resID = useParams().restarauntId;
    const [restaurantData, setRestaurantData] = useState([]);
    const [restaurantCategory, setRestaurantCategory] = useState(["All"])
    const [allowedDishes, setAllowedDishes] = useState([])

    let AllDishesData = useRef("");

    useEffect(() => {    

        (async () => {
            let response = await fetch("https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/restaurantDetails/"+resID)
            response = await response.json();
            setRestaurantData(response.restaurantDetail)
            updateRestaurantCategory(Dishes.restaurantDishes)
            updateAllowedDishes(Dishes.restaurantDishes);

            AllDishesData.current = Dishes.restaurantDishes;
        })()

        document.getElementsByClassName("categoryItem")[0].classList.add("active");

    },[resID])


    let updateRestaurantCategory = (CategoryList) => {

        let tempList = ["All"]
        CategoryList.forEach(function(item){  
            let restaurantsAllowed = item.restaurantName;
            if(restaurantsAllowed.indexOf(resID) !== -1){
                if(tempList.indexOf(item.itemCategory) === -1){
                    tempList.push(item.itemCategory)
                }
            }
        });
        setRestaurantCategory(tempList);
    }

    let updateAllowedDishes = (DishesList) => {

        DishesList.forEach(function(item){  
            let restaurantsAllowed = item.restaurantName;
            if(restaurantsAllowed.indexOf(resID) !== -1)    setAllowedDishes(arr => [...arr,<MenuItem key = {item.id} itemData = {item} />]);
        });

    }

    let filterWithCategory = (e) => {
        let requiredCategory = e.target.innerHTML;
        let tmpDishesList = [];
        setAllowedDishes([]);

        clearActive();
        e.target.className += " active";

        if(requiredCategory !== "All"){
            AllDishesData.current.forEach(function(item){
                if(item.itemCategory === requiredCategory && tmpDishesList.indexOf(item) === -1) tmpDishesList.push(item);  
            })
        } else {
            tmpDishesList = AllDishesData.current;
        }
        updateAllowedDishes(tmpDishesList);
    }


    let clearActive = () => {
        let elementList =  document.getElementsByClassName("categoryItem");
        for(let item of elementList)    item.classList.remove("active")
    }

    return (
        <div className = "restaurantPage">
            <div className = "restaurantPage-about">
                <div className = "restaurantPage-info">
                    <h3>{restaurantData.restaurantName}</h3>
                    <p>{restaurantData.restaurantDescription}</p>
                    <p>{restaurantData.openingHours}</p>
                    <p>{restaurantData.contactNumber}</p>
                    <h3><a rel = "noreferrer" target = "_blank" href = {restaurantData.websiteUrl}>{restaurantData.websiteUrl}</a></h3>
                </div>
                <div className = "restaurantPage-image">
                    <img alt = "Restaurant Pics" src = {restaurantData.restaurantImage} />
                </div>
            </div>
            <div className = "restaurantPage-menu">
                <h3>Categories</h3>
                    {restaurantCategory.map(function(item,index){
                        return <button key = {index} onClick = {filterWithCategory} className = "categoryItem">{item}</button>
                    })}
                <h3>Menu</h3>
                <div className = "restaurantPage-dishes">
                    {allowedDishes.map(function(item,index){
                        return item;
                    })}
                </div>
            </div>
        </div>
    )
}

export {Restaurant};