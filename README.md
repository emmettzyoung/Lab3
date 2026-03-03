# Lab3

# Welcome to Emmett Young's Lab 3 Repository

### In this repository, you will find the following:
- index.html: Responsible for loading in necessary packages and displaying the front end code correctly, with features presented here such as buttons and headers.
- script.js: Responsible for the functionality of elements defined in the index.html file, including the map, the drop-down menu, the checkboxes, and the hover mechanics for neighbourhoods as well.
- style.css: Responsible for the styling of the body, map, buttons, headers, and text, all to ensure user experience is appealing. 
- Neighbourhoods_Clean: Houses GeoJSON files.
- Neighbourhoods_Shapefiles: Houses rough work shapefiles

### The intended use of this map:
This map is intended for those who want a quick visualization of median incomes or persons in unsuitable housing across Toronto. While this was data that I already had, I was inspired by the idea of wanting a visualization in a moment that is quick and simple, not requiring any ArcGIS computations. Through this webmap, someone can just take a screenshot and have a (mostly) full picture of incomes and unsuitable housing across the city.

### Notes of ownership:
This map and the code included should not be copied without the owner being mentioned. Please mention any code copied was written by emmettzyoung on GitHub. Additionally, use of my mapbox token for other projects is not allowed, and users trying to make use of MapBox's API must retrieve and use their own access token.

### A.I. Usage:
The use of Artificial Intelligence was used in this project to help create a legend that updates based on the current selected layer. This was accomplished through first creating a legend for the default selected view, before asking the LLM Claude for assistance in the creation of an updating legend relative to the selected form option. With the rest of my code in my JavaScript file as a context, Claude helped to create a legend dictionary, before creating a function that updats the legend by clearing the existing contents and rebuilding it to match the current selected form option. For more information on this usage in addition to other minor troubleshooting issues, feel free to contact me for further information.
