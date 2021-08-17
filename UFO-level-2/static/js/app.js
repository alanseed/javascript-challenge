// get the luxon date object
var DateTime = luxon.DateTime;

// from data.js
var tableData = data;

// Checkbox watch if all is selected
document.getElementById("id_0").addEventListener("change", runSelectAll);

// Select the button and form
var button = d3.select("#sumbitButton");
button.on("click", runEnter);

var tbody = d3.select("tbody");
var startDate = getStartDate(data);
document.getElementById("startDateSelector").value = startDate.toISODate();

var endDate = getEndDate(data);
document.getElementById("endDateSelector").value = endDate.toISODate();

// make the list of states in the data
var stateList = getStateList(data);
addCheckBoxList(stateList); 

var checkedStateList = [];

// Function to return the list of selected states 
function getCheckedStates(){
  let checkedStatesList = [];   
  let test = document.getElementById("id_0") ;

  // loop over the list of states in the data file 
  for ( let i = 0; i < stateList.length; i++){ 
    let id = `id_${i + 1}`;
    let elem = document.getElementByID(id) ;
    if (elem.checked){
      checkedStatesList.push(stateList[i]);
      console.log(stateList[i]);
    }
  }
  return checkedStatesList; 
}

// Function to toggle the select all in the checkbox list
function runSelectAll() {
  let checkStatus = document.getElementById("id_0").checked;
  let list = document.getElementsByTagName("input");
  for (let i = 0; i < list.length; i++) {
    list[i].checked = checkStatus;
  }
}

// Function to make the table based on the selections
function runEnter() {
  d3.event.preventDefault();
  checkedStateList.length = 0 ;

  let start = document.getElementById("startDateSelector").value;
  let end = document.getElementById("endDateSelector").value;
  startDate = DateTime.fromISO(start);
  endDate = DateTime.fromISO(end);

  // filter the data by these dates
  var filteredData = data.filter(filterByDate); 
  
  // get the list of states from the checkboxes and filter
  let selectAll = document.getElementById("id_0").checked ;
  if (!selectAll){
    for ( let i = 0; i < stateList.length; i++){ 
      const id = `id_${i + 1}`;
      let elem = document.getElementById(id) ;
      if (elem.checked){
        checkedStateList.push(stateList[i]);
      }
    }
  }
  var filterByStateData = filteredData;
  if (!selectAll){ 
    filterByStateData = filteredData.filter(filterByState); 
  }

  // remove the existing rows in the table
  tbody.selectAll("tr").remove();

  filterByStateData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      if (key != "country") {
        var cell = row.append("td");
        if (key === "datetime") {
          let reportDate = DateTime.fromFormat(value, "M/d/yyyy");
          value = reportDate.toISODate();
        }
        cell.text(value);
      }
    });
  });
}

// Function to filter by state 
function filterByState(report){ 
  for (let i = 0; i < checkedStateList.length; i++){
    if ( checkedStateList[i] === report.state) return true ;
  }
  return false;
}

// Function to filter by dates 
function filterByDate(report) {
  var reportDate = DateTime.fromFormat(report.datetime, "M/d/yyyy");
  if (
    reportDate.toSeconds() >= startDate.toSeconds() &&
    reportDate.toSeconds() <= endDate.toSeconds()
  ) {
    return true;
  } else {
    return false;
  }
}

// Function to get the first date in the data
function getStartDate(data) {
  let minDate = DateTime.utc();
  let reportDate;
  for (let i = 0; i < data.length; i++) {
    reportDate = DateTime.fromFormat(data[i].datetime, "M/d/yyyy");
    if (reportDate.toSeconds() < minDate.toSeconds()) {
      minDate = reportDate;
    }
  }
  return minDate;
}

// Function to get the last date in the data
function getEndDate(data) {
  let maxDate = DateTime.fromISO("1970-01-01T00:00:00");
  let reportDate;
  for (let i = 0; i < data.length; i++) {
    reportDate = DateTime.fromFormat(data[i].datetime, "M/d/yyyy");
    if (reportDate.toSeconds() > maxDate.toSeconds()) {
      maxDate = reportDate;
    }
  }
  return maxDate;
}

// Functions to make the list of states that are in the data file
function getStateList(data) {
  var states = [];
  for (let i = 0; i < data.length; i++) {
    addState(states, data[i].state);
  }
  return states;
}

function addState(states, state) {
  for (let i = 0; i < states.length; i++) {
    if (state == states[i]) return;
  }
  states.push(state);
  return;
}

// Function to make the dropdown list of states
function addCheckBoxList(states) {
  let myDiv = document.getElementById("checkboxList");

  // loop over the states and make the check boxes
  for (let i = 0; i < states.length; i++) {
    // create the li element
    let list = document.createElement("li");

    // creating checkbox element
    let checkbox = document.createElement("input");

    // Assigning the attributes
    // to created checkbox
    checkbox.type = "checkbox";
    checkbox.name = `name_${i + 1}`;
    checkbox.value = states[i];
    checkbox.id = `id_${i + 1}`;

    // creating label for checkbox
    let label = document.createElement("label");

    // assigning attributes for the created label tag
    label.htmlFor = `id_${i + 1}`;

    // appending the created text to the created label tag
    label.appendChild(document.createTextNode(states[i]));

    // append to the list item
    list.appendChild(checkbox);
    list.appendChild(label);

    // append to the dropdown
    myDiv.appendChild(list);
  }
}
