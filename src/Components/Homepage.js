import React, {useState, useEffect, useRef} from 'react';
import { RestaurantItem} from './ItemBox';
import { Link } from 'react-router-dom';
import { FilterMenu, ShowFilter, CloseFilter } from './FilterMenu';
import { SideMenu, ShowMenu } from './SideMenu';
import FilterIcon from "../assets/icons8-filter-48.png"
import HamburgerIcon from "../assets/icons8-menu-48.png"
import Loader from 'react-loader-spinner';

function Homepage(){

    const [restaurantList, setRestaurantList] = useState([]);   // State to hold the list of restaraunts to be displayed.

    const [category, setCategory] = useState([]);               // State to hold the list of categories available.
    const [cuisine, setCuisine] = useState([]);                 // State to hold the list of cuisines available.

    const [filterCategory, setFilterCategory] = useState([])    // State to hold all the filters applied on categories.
    const [filterCuisine, setFilterCuisine] = useState([]);     // State to hold all the filters applied on cuisine.
    const [isLoading,setIsLoading] = useState(true)             // State to check if Loading is complete.

    let sortWithOpen = false;

    let apiData = useRef("")

    useEffect(() => {

        (async () => {                          // Async funtion to fetch API Data and populate the required states.
            let response = await fetchData()
            apiData.current = response.allRestaurants;      // Variable to hold the complete API Data 

            updateRestaurantListData(apiData.current);
            updateCategoryListData();
            updateCuisineListData();

            setIsLoading(false);            // Post fetch, the isLoading state is set as False so that data can be displayed.
            
            let element = document.getElementsByClassName("categoryItem");
            if(element[6]){
                element[6].classList.add("filterItem");
                element[6].classList.remove("categoryItem")
            }

        })()

    },[])
    
    let updateRestaurantListData = (tempRestList) => {  // For each restaurant to be displayed, the array is modified with an Item Box to hold its contents.
        let rList = []
        tempRestList.forEach(function(item){    
            rList.push(<Link key = {item.id} to = {`restaurants/${item.id}`}><RestaurantItem itemData = {item} /></Link>)
        })
        if(tempRestList.length === 0 && rList.length === 0) rList.push(<h3 key = "restaurant-not-found" className = "restaurant-not-found">Oops ! No Restaurants found based on your filters. Clear all and try again !</h3>)
        setRestaurantList(rList)
    }

    let updateCategoryListData = () => {    // Function to add available categories.
        let categoryList = []
        let tempCategList = []
        apiData.current.forEach(function(item){
            tempCategList = JSON.parse(item.restaurantCategory).flat(); // Parse and Flat functions are applied since data held in the object is a JSON filled with Array.
            tempCategList.forEach(function(arrItem){
                if(categoryList.indexOf(arrItem) === -1 ) categoryList.push(arrItem);   // Only new categories are included in the list.
            });
        })
        categoryList.push("Clear All")
        setCategory(categoryList);
    }

    let updateCuisineListData = () => { // Function to add available categories.
        let cuisineList = []
        let tempCuisineList = []
        apiData.current.forEach(function(item){
            tempCuisineList = JSON.parse(item.restaurantCuisine).flat();    // Parse and Flat functions are applied since data held in the object is a JSON filled with Array.
            tempCuisineList.forEach(function(arrItem){
                if(cuisineList.indexOf(arrItem) === -1 ) cuisineList.push(arrItem); // Only new cuisines are included in the list.
            });
        })
        setCuisine(cuisineList);
    }
   
    let addFilters = (e) => {                   // Function to add filters.
        let selectedItem = e.target;

        switch(selectedItem.className){

            case "cuisineItem":     // Filter on Cuisines.
                let tmpFilterCuisine = filterCuisine;
                tmpFilterCuisine.push(selectedItem.innerHTML)
                setFilterCuisine(tmpFilterCuisine);

                selectedItem.className += " active"
                selectedItem.disabled = true;
                break;

            case "sortItem":        // Filter on Sort with Open filter.
                sortWithOpen = true;
                selectedItem.className += " active"
                selectedItem.disabled = true;
                break;

            case "categoryItem":    // Filter on Categories.
                let tmpFilterCategory = filterCategory;
                tmpFilterCategory.push(selectedItem.innerHTML)
                setFilterCategory(tmpFilterCategory);
    
                selectedItem.className += " active"
                selectedItem.disabled = true;

                applyFilters();
                break;

           default:         // Apply or Clear Filters
                if(selectedItem.innerHTML === "Clear All") clearFilters();
                else applyFilters();
                break;
        }
    }


    let applyFilters = () => {  // Based on the available filters, restaurants will be filtered.
        
        CloseFilter();

        let resData = apiData.current
        if(filterCuisine.length >= 1) resData = applySpecificFilter(resData,"restaurantCuisine",filterCuisine)  // Filter Restaurants based on Cuisine.
        if(filterCategory.length >= 1) resData = applySpecificFilter(resData,"restaurantCategory",filterCategory)   // Filter Restaurants based on Category.
        if(sortWithOpen) resData = applySpecificFilter(resData,"isOpen",sortWithOpen)       // Filter Restaurants based on Open or Closed.

        updateRestaurantListData(resData);
    }

    let applySpecificFilter = (resData, key, requiredValues) => {   // Common Function to apply filters.
        let tempRestList = []
        resData.forEach(function(item){
            let data = item[key]
            if(key === "restaurantCuisine" || key === "restaurantCategory") data = JSON.parse(data).flat();
            if(key === "isOpen"){
                if(data === true) tempRestList.push(item);
            } else {
                data.forEach(function(arrItem){ //Check if category/cuisine available in the restaurant is of the required value and if it has not been added before to our temporary list.
                    if(requiredValues.indexOf(arrItem) !== -1 && tempRestList.indexOf(item) === -1) tempRestList.push(item);
                })
            }
        })
        return tempRestList;
    }

    let clearFilters = () => {      // Clear all filters available.
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
        <div>
            {isLoading // If Fetch has not been complete, a Loading animation will be displayed.
            ? (<div className = "loaderDiv"><Loader type="TailSpin" color="#00BFFF" height={120} width={120}/></div>)
            : (         // If Fetch has been completed, the required content will be displayed.
            <div className = "homepage">
                <div className = "filterSection">
                    <span id = "sideMenuBtn" className = "sideMenuBtn" onClick = {ShowMenu} ><img alt = "HamburgerIcon" src={HamburgerIcon}/></span>
                    <SideMenu />
                    <span id = "filterMenuBtn" className = "filterMenuBtn"><img alt = "FilterIcon" src={FilterIcon} onClick = {ShowFilter} /></span>
                    <FilterMenu cuisineData = {cuisine} btnFunction = {addFilters} />           
                </div> 
                <div className = "listSection">
                    <h1 className = "applicationName">Food for Thoughts</h1>
                    <h3 className = "applicationDescription">Find the food you are thinking about now !</h3>
                    <div className = "list-category">
                        <h2>Categories</h2>
                        {category.map(function(item,index){ // Iterating through each of the available categories.
                            return <button key = {index} onClick = {addFilters} className = "categoryItem">{item}</button>
                        })}
                    </div>
                    <div className = "list-restaurants">
                        <h2>Restaurants</h2>
                        {restaurantList.map(function(item,index){   // Iterating through each restaurant based on filters.
                            return item;
                        })}
                    </div>
                </div>
            </div>
            )}
        </div>
    )

}

export {Homepage};