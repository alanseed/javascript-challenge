// from data.js
var tableData = data;

// Select the button and form 
var button = d3.select("#filter-btn");
button.on("click", runEnter); 

var form = d3.select("#datetime");
// TO DO - Not sure why the submit is not working 

form.on("select", runEnter)

function runEnter(){ 
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime");
    var inputValue = inputElement.property("value");

    // filter the data by this date 
    var filteredData = data.filter(data => data.datetime === inputValue);
    console.log(filteredData);
  
}

