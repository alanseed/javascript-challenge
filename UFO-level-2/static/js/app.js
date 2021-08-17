// get the luxon date object 
var DateTime = luxon.DateTime; 

// from data.js
var tableData = data;

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
var stateDropDown = d3.select("#stateList"); 
for ( let i = 0; i < stateList.length; i++ ){
  let htmlString = '<button class=\'dropdown-item\' type=\'button\'>'+stateList[i]+'<\/button>' ;
  stateDropDown.insert("li").html(htmlString) ;
}

function runEnter() {
  d3.event.preventDefault();

  let start = document.getElementById("startDateSelector").value;
  let end = document.getElementById("endDateSelector").value;
  startDate = DateTime.fromISO(start);
  endDate = DateTime.fromISO(end);
  
  // remove the existing rows in the table
  tbody.selectAll("tr").remove(); 

  // filter the data by these dates
  var filteredData = data.filter(filterByDate);
    
  filteredData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      if (key != "country"){
        var cell = row.append("td");
        if ( key === 'datetime'){
          let reportDate = DateTime.fromFormat(value, "M/d/yyyy") ;
          value = reportDate.toISODate();
        }
        cell.text(value);
      }
    });
  })
}

function filterByDate(report){
  var reportDate = DateTime.fromFormat(report.datetime, "M/d/yyyy") ; 
  if ( reportDate.toSeconds() >= startDate.toSeconds() && 
      reportDate.toSeconds() <= endDate.toSeconds() ){
        return true ;
      } 
  else {
     return false; 
  }
}

function getStartDate(data){
  let minDate = DateTime.utc() ;
  let reportDate ;
  for ( let i = 0; i < data.length; i++ ){
    reportDate = DateTime.fromFormat(data[i].datetime, "M/d/yyyy") ;
    if ( reportDate.toSeconds() < minDate.toSeconds() ){ 
      minDate = reportDate;
    }
  }
  return minDate ; 
}

function getEndDate(data){
  let maxDate = DateTime.fromISO("1970-01-01T00:00:00") ;
  let reportDate ;
  for ( let i = 0; i < data.length; i++ ){
    reportDate = DateTime.fromFormat(data[i].datetime, "M/d/yyyy") ;
    if ( reportDate.toSeconds() > maxDate.toSeconds() ){ 
      maxDate = reportDate;
    }
  }
  return maxDate ; 
} 

function getStateList(data){
  var states = ["All States"];
  for ( let i = 0; i < data.length; i++){ 
    addState(states, data[i].state); 
  }
  return states ;
}

function addState(states, state){ 
  for ( let i = 0; i < states.length; i++){
    if (state == states[i] ) return ; 
  }
  states.push(state);
  return ; 
}