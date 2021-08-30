import React, {useState, useEffect, useRef} from 'react';
import { RestaurantItem } from './ItemBox';
import { Link } from 'react-router-dom';
import { FilterMenu, ShowFilter, CloseFilter } from './FilterMenu';
import FilterIcon from "../assets/icons8-filter-48.png"

function ListRestaurants(){

    const [restaurantList, setRestaurantList] = useState([]);

    const [category, setCategory] = useState([]);
    const [cuisine, setCuisine] = useState([]);

    const [filterCategory, setFilterCategory] = useState([])
    const [filterCuisine, setFilterCuisine] = useState([]);

    let sortWithOpen = false;

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
        categoryList.push("Clear All")
        setCategory(categoryList);

        let clearElement = document.getElementsByClassName("categoryItem")[6]
        clearElement.classList.add("filterItem");
        clearElement.classList.remove("categoryItem");
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
        setCuisine(cuisineList);
    }
   
    let addFilters = (e) => {
        let selectedItem = e.target;

        switch(selectedItem.className){

            case "cuisineItem":
                let tmpFilterCuisine = filterCuisine;
                tmpFilterCuisine.push(selectedItem.innerHTML)
                setFilterCuisine(tmpFilterCuisine);

                selectedItem.className += " active"
                selectedItem.disabled = true;
                break;

            case "sortItem":
                sortWithOpen = true;
                selectedItem.className += " active"
                selectedItem.disabled = true;
                break;

            case "categoryItem":
                let tmpFilterCategory = filterCategory;
                tmpFilterCategory.push(selectedItem.innerHTML)
                setFilterCategory(tmpFilterCategory);
    
                selectedItem.className += " active"
                selectedItem.disabled = true;

                applyFilters();
                break;

           default:
                if(selectedItem.innerHTML === "Clear All") clearFilters();
                else applyFilters();
                break;
        }
    }


    let applyFilters = () => {
        
        CloseFilter();

        let resData = apiData.current
        if(filterCuisine.length >= 1) resData = applySpecificFilter(resData,"restaurantCuisine",filterCuisine)
        if(filterCategory.length >= 1) resData = applySpecificFilter(resData,"restaurantCategory",filterCategory)
        if(sortWithOpen) resData = applySpecificFilter(resData,"isOpen",sortWithOpen)

        updateRestaurantListData(resData);
    }

    let applySpecificFilter = (resData, key, requiredValues) => {
        let tempRestList = []
        resData.forEach(function(item){
            let data = item[key]
            if(key === "restaurantCuisine" || key === "restaurantCategory") data = JSON.parse(data).flat();
            if(key === "isOpen"){
                if(data === true) tempRestList.push(item);
            } else {
                data.forEach(function(arrItem){
                    if(requiredValues.indexOf(arrItem) !== -1 && tempRestList.indexOf(item) === -1) tempRestList.push(item);
                })
            }
        })
        return tempRestList;
    }

    let clearFilters = () => {
        let tmpRestList = apiData.current;

        setFilterCuisine([]);
        setFilterCategory([]);
        sortWithOpen =  false;

        let elementList =  document.getElementsByClassName("categoryItem");
        for(let item of elementList)    item.classList.remove("active")

        elementList =  document.getElementsByClassName("sortItem");
        for(let item of elementList)    item.classList.remove("active")

        elementList =  document.getElementsByClassName("cuisineItem");
        for(let item of elementList)    item.classList.remove("active")

        updateRestaurantListData(tmpRestList);
    }

    let fetchData = async() => {
        let response = await fetch("https://api.sheety.co/bdcbafbc1f4197dda178b9e69f6ccee9/techAlchemyWebTest1/allRestaurants")
        response = await response.json();
        return response;
    }

    return (
        <div className = "homepage">
            <div className = "filterSection">
                <span className = "filterMenuBtn" onClick = {ShowFilter} ><img alt = "FilterIcon" src={FilterIcon}/></span>
                <FilterMenu cuisineData = {cuisine} btnFunction = {addFilters} />           
            </div> 
            <div className = "listSection">
                <div className = "list-category">
                    <h2>Categories</h2>
                    {category.map(function(item,index){
                        return <button key = {index} onClick = {addFilters} className = "categoryItem">{item}</button>
                    })}
                </div>
                <div className = "list-restaurants">
                    <h2>Restaurants</h2>
                    {restaurantList.map(function(item,index){
                        return item;
                    })}
                </div>
            </div>
        </div>
    );

}

export {ListRestaurants};