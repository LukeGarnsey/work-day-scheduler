// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeout = undefined;
$(function () {
  // dayjs.extend(window.dayjs_plugin_utc);
  // console.log(dayjs().format("Do"));
  // var now = dayjs();
  // var advancedFormat = require('dayjs/plugin/advancedFormat')
  // dayjs.extend(advancedFormat)
  $("#currentDay").text(dayjs().format("dddd, MMMM DD") );
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  let currentHour = parseInt(dayjs().format("H"));
  
  for(let i = 9; i<=17; i++){
    timeclass = "present";
    if(i < currentHour)
      timeclass = "past";
    else if(i > currentHour)
      timeclass = "future";
    
    createTimeBlock((i > 12? (i - 12)+"PM" : i + "AM"), timeclass);
  }
});
function createTimeBlock(time, timeClass){
  console.log(time);
  var id = "hour-"+time.substring(0, time.length - 2);
  var containerElement = $("<div>");
  containerElement.addClass("row time-block");
  containerElement.addClass(timeClass);
  var timeElement = $("<div>");
  timeElement.text(time);
  timeElement.addClass("col-2 col-md-1 hour text-center py-3");
  containerElement.append(timeElement);
  let textAreaElement = createTextArea(id);
  containerElement.append(textAreaElement);
  containerElement.append(createButton(textAreaElement, id));
  containerElement.attr("id", id);
  $("#time-container").append(containerElement);
}
function createTextArea(id){
  var textArea = $("<textarea>");
  textArea.addClass("col-8 col-md-10 description");
  textArea.attr("rows", "3");
  textArea.val(checkStorage(id));
  return textArea;
}
function createButton(textAreaElement, id){
  console.log(id);
  var button = $("<button>");
  button.addClass("btn saveBtn col-2 col-md-1");
  button.attr("aria-label", "save");
  var i = $("<i>");
  i.addClass("fas fa-save");
  i.attr("aria-hidden", "true");
  button.append(i);
  button.on("click", function(){
    let text = $(textAreaElement).val();
    if(text === "")
      return;
    localStorage.setItem(id, text);
    if(timeout !== undefined)
      clearTimeout(timeout);
      
    timeout = setTimeout(() => {
      $("#header-saved").css("display", "none");
      timeout = undefined;
    }, 2000);
    $("#header-saved").css("display", "block");
  });
  return button
}
function checkStorage(id){
  var item = localStorage.getItem(id);
  if(item === null)
    item = "";

  return item;
}


