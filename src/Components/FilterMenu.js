import React from "react";

let FilterMenu = (props) => {
  // Menu to show the filters available for choosing restaurants.

  return (
    <div>
      <div className="FilterMenu">
        <h3 onClick={CloseFilter} className="closeBtn">
          &times;
        </h3>
        <h3>Cuisines</h3>
        {props.cuisineData.map(function (item, index) {
          // Iterating between each of the available cuisines.
          return (
            <button
              key={index}
              onClick={props.btnFunction}
              className="cuisineItem"
            >
              {item}
            </button>
          );
        })}
        <h3>Sort By</h3>
        <button className="sortItem" onClick={props.btnFunction}>
          Open
        </button>
        <br />
        <h3>Filter Operations</h3>
        <button className="filterItem" onClick={props.btnFunction}>
          Clear All
        </button>
        <button className="filterItem" onClick={props.btnFunction}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

let ShowFilter = () => {
  // Function to display the filter on click of the Filter Icon.
  document.getElementsByClassName("FilterMenu")[0].style.width = "250px";
  document.getElementsByClassName("listSection")[0].style.filter = "blur(5px)";
  document.getElementById("filterMenuBtn").style.display = "none";
};

let CloseFilter = () => {
  // Function to hide the filter on click of the Close Icon.
  document.getElementsByClassName("FilterMenu")[0].style.width = "0px";
  document.getElementsByClassName("listSection")[0].style.filter = "blur(0px)";
  document.getElementById("filterMenuBtn").style.display = "block";
  //document.getElementById("filterMenuBtn").addEventListener("click",() => {
  //    ShowFilter()
  //});
};

export { FilterMenu, ShowFilter, CloseFilter };
