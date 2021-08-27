import React, {useState, useEffect, useRef} from 'react';
import { RestaurantItem } from './RestaurantItem';
import { Link } from 'react-router-dom';

function ListRestaurants(){

    const [restaurantList, setRestaurantList] = useState([]);

    const [category, setCategory] = useState([]);
    const [cuisine, setCuisine] = useState([]);

    const [filterCategory, setFilterCategory] = useState([])
    const [filterCuisine, setFilterCuisine] = useState([]);

    const availablity = ["Open","Clear"];

    let apiData = useRef("")

    useEffect(() => {
        (async () => {
            let response = await fetchData()
            apiData.current = response.allRestaurants;
            updateRestaurantListData(apiData.current);
            updateCategoryListData();
            updateCuisineListData();
        })()

    },[])
    
    let updateRestaurantListData = (tempRestList) => {
        let rList = []
        tempRestList.forEach(function(item){
            rList.push(<Link key = {item.id} to = {`restaurants/${item.id}`}><RestaurantItem itemData = {item} /></Link>)
        })
        setRestaurantList(rList)
    }

    let updateCategoryListData = () => {
        let categoryList = []
        let tempCategList = []
        apiData.current.forEach(function(item){
            tempCategList = JSON.parse(item.restaurantCategory).flat();
            tempCategList.forEach(function(arrItem){
                if(categoryList.indexOf(arrItem) === -1 ) categoryList.push(arrItem);
            });
        })
        categoryList.push("Clear")
        setCategory(categoryList);
    }

    let updateCuisineListData = () => {
        let cuisineList = []
        let tempCuisineList = []
        apiData.current.forEach(function(item){
            tempCuisineList = JSON.parse(item.restaurantCuisine).flat();
            tempCuisineList.forEach(function(arrItem){
                if(cuisineList.indexOf(arrItem) === -1 ) cuisineList.push(arrItem);
            });
        })
        cuisineList.push("Clear")
        setCuisine(cuisineList);
    }


    let filterWithCategory = (e) => {

        let requiredCategory = e.target.innerHTML
        let tmpRestList = []

        if(requiredCategory!== "Clear"){
            let tmpFilterCategory = filterCategory;
            tmpFilterCategory.push(requiredCategory)
            setFilterCategory(tmpFilterCategory);

            e.target.className += " active"
            document.getElementsByClassName("categoryItem")[6].disabled = false;

            apiData.current.forEach(function(item){
                JSON.parse(item.restaurantCategory).flat().forEach(function(arrItem){
                    if(filterCategory.indexOf(arrItem) !== -1  && tmpRestList.indexOf(item) === -1) tmpRestList.push(item);
                })
            })
        } else {
            setFilterCategory([])
            tmpRestList = apiData.current;

            let elementList =  document.getElementsByClassName("categoryItem");
            for(let item of elementList)    item.classList.remove("active")

        }
        updateRestaurantListData(tmpRestList)
    }

    let filterWithCuisine = (e) => {

        let requiredCuisine = e.target.innerHTML
        let tmpRestList = []

        if(requiredCuisine!== "Clear"){
            let tmpFilterCuisine = filterCuisine;
            tmpFilterCuisine.push(requiredCuisine)
            setFilterCuisine(tmpFilterCuisine);

            e.target.className += " active"

            apiData.current.forEach(function(item){
                JSON.parse(item.restaurantCuisine).flat().forEach(function(arrItem){
                    if(filterCuisine.indexOf(arrItem) !== -1 && tmpRestList.indexOf(item) === -1) tmpRestList.push(item);
                })
            })
        } else {
            setFilterCategory([])
            tmpRestList = apiData.current;

            let elementList =  document.getElementsByClassName("cuisineItem");
            for(let item of elementList)    item.classList.remove("active")

        }
        updateRestaurantListData(tmpRestList)
    }    

    let filterWithAvailablity = (e) => {
        let requiredAvailablity = e.target.innerHTML
        let tmpRestList = []

        if(requiredAvailablity!== "Clear"){
            e.target.className += " active"
            apiData.current.forEach(function(item){
                if(item.isOpen === true)    tmpRestList.push(item);
            })
        } else {
            tmpRestList = apiData.current;
            let elementList =  document.getElementsByClassName("availableItem");
            for(let item of elementList)    item.classList.remove("active")
        }
        updateRestaurantListData(tmpRestList)
    }

    let fetchData = async() => {
        let response = await fetch("https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/allRestaurants")
        response = await response.json();
        return response;
    }

    return (
        <div>
            <div className = "list-category">
                <h2>Categories</h2>
                {category.map(function(item,index){
                    return <button key = {index} onClick = {filterWithCategory} className = "categoryItem">{item}</button>
                })}
            </div>
            <div className = "list-cuisine">
                <h2>Cuisines</h2>
                {cuisine.map(function(item,index){
                    return <button key = {index} onClick = {filterWithCuisine} className = "cuisineItem">{item}</button>
                })}
            </div>
            <div className = "list-availablity">
                <h2>Availablity</h2>
                {availablity.map(function(item,index){
                    return <button key = {index} onClick = {filterWithAvailablity} className = "availableItem">{item}</button>
                })}
            </div>
            <div className = "list-restaurants">
                <h2>Restaurants</h2>
                {restaurantList.map(function(item,index){
                    return item;
                })}
            </div>
        </div>
    );

}

export {ListRestaurants};