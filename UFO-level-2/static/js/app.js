// get the luxon date object 


// from data.js
var tableData = data;

// Select the button and form 
var button = d3.select("#sumbitButton");
button.on("click", runEnter); 

var tbody = d3.select("tbody");

function runEnter() {
  d3.event.preventDefault();
  var startDate = document.getElementById("startDateSelector").value;
  var endDate = document.getElementById("endDateSelector").value;

  // remove the existing rows in the table
  tbody.selectAll("tr").remove(); 

  // filter the data by these dates
  var filteredData = data.filter(data => data.datetime === startDate);
    
  filteredData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  })
}