# javascript-challenge

## Introduction  
This project displays a table of UFO "sightings" based on user selected dates and locations. There are two implementations of the web page:  
* UFO-level-1 A minimum viable product that allows the user to display the reports for a specific day,  
* UFO-level-2 A web page that allows the user to select reports between a range of dates and locations.  

## Directory structure  
```README.md``` This readme file  
```.gitignore``` The gitignore file set to ignore VSCode and other temporary files  

```UFO-level-1```  The minimum viable product web page   
* ```static```  
  * ```css```    
    * ```style.css``` The style file used for the web page    
  * ```images```    
    * ```nasa.jpg``` Background image for web page   
    * ```ufo.svg``` UFO icon  
  * ```js```  
    * ```app.js``` JavaScript 
    * ```data.js``` Report data  
* ```index.html``` The landing page  

```UFO-level-2```  The web page with increased search options    
* ```static```  
  * ```css```    
    * ```style.css``` The style file used for the web page    
  * ```images```    
    * ```nasa.jpg``` Background image for web page   
    * ```ufo.svg``` UFO icon  
  * ```js```  
    * ```app.js``` JavaScript 
    * ```data.js``` Report data  
* ```index.html``` The landing page  
## Dependencies   
* Bootstrap 5  to manage the styling of the web page  
* Luxon 2.0.2 to parse the date string  
* D3.js for managing some of the interactive components of the web page  


## Discussion  
Stage 1 is the minimum viable product web page is based on the template that was provided at the start of the project.   

For Stage 2 I attempted to make a more dynamic web page but with less styling. I based it on Bootstrap 5 components, using cards and the grid system to place the elements on the page and then a striped table for the text content.  

The problem in the design was the width of the table due to the comments and the number of columns. I therefore decided to place the card that contained the selection functions above the table and over the full width of the page. 

I decided to allow the user to select a start and end date and the location (state) of the report. The selection functions needed to be aware of the content in the data file, for example the range of dates of the reports and the locations of the reports. Therefore the page prefills in the start and end date selectons with the dates from the file, and the drop down check box for location only inludes states that are in the data set. 

The date and time formatting was an issue. The date string in the data was the US style mm/dd/yyyy. The date on the selectors is dd/mm/yyyy and in the table and in the js script is the ISO standard yyyy/mm/dd. I was intending to use the ISO standard for the selectors as well but ran out of time to read up on how to do this. 
