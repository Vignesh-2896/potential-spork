# A Food Ordering application built on React.

## Fetch and Display
On page load there will be a fetch to the API to get the list of restaurants. Until the fetch is complete, system will display a loading aimation. 
Using this list of restaurant, the available list of food categories & cuisines will be extraced and saved in their respective states.
Each element in the restaurant, category and cuisine list will be attached to a component with their respective values. This will make it easier while displaying the information.

Each restaurant item will be linked to a restaurant page, where more information about it will be present.

## Filters
There are 3 available filters.
1. Category
2. Cuisine
3. Open for Business

The filters for cuisine and open for business are present in the filter menu that can be navigated using the filter icon on the top right corner.
Once you have selected your choices in the filter menu, you can click on Apply Filters to re-render the page with restaurants based on your choice.
You can apply all three filters at the same time.
In case there isn't an available restaurant, you will be duly informed about the same by application.

## Restaurant Page
The Restaurant Page will look for a parameter with which it can fetch details of a particular restaurant.
Using a dummy json file created by me, dishes will be fetched which belong to our required restaurant.
Category filter is available, which will then display the dishes of that particular category under our required restaurant.
The Side Menu can be used to navigated back to the home page.

## Design
Responsive design elements have been included so that the website can be viewed on a phone.

## Routing
A Simple Routing is present in between the home page and the restaurant page.
A Restaurant ID will be passed from Home Page to the Restaurant Page.
If no ID is passed React will move you to a standing page with a link back to the home page.