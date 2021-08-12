// get the luxon date object 
var DateTime = luxon.DateTime; 

// from data.js
var tableData = data;

// Select the button and form 
var button = d3.select("#filter-btn");
button.on("click", runEnter); 

var tbody = d3.select("tbody");

function runEnter() {
  d3.event.preventDefault();

  var inputElement = d3.select("#datetime");
  var inputValue = inputElement.property("value");
  var tDate = DateTime.fromFormat(inputValue, "d/M/yyyy")
  
  // remove the existing rows in the table
  tbody.selectAll("tr").remove(); 

  // filter the data by this date if it is valid
  if (tDate.isValid) {
    var filteredData = data.filter(data => data.datetime === inputValue);
    
    filteredData.forEach((ufoReport) => {
      var row = tbody.append("tr");
      Object.entries(ufoReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
      });
    })
  }
  else {
    document.getElementById("datetime").value = "1/11/2011"
  }
}

var form = document.getElementById('datetime');
form.addEventListener('keydown', function (event) {
  let x = event.key;
  if (x.charCodeAt(0) == 69) {
    console.log("enter");
    runEnter()
  }
});