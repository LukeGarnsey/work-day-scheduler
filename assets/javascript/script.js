
var timeout = undefined;

$(function () {
  dayjs.extend(window.dayjs_plugin_advancedFormat);
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

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
  var button = $("<button>");
  button.addClass("btn saveBtn col-2 col-md-1");
  button.attr("aria-label", "save");
  var i = $("<i>");
  i.addClass("fas fa-save");
  i.attr("aria-hidden", "true");
  button.append(i);
  button.on("click", function(){
    localStorage.setItem(id, $(textAreaElement).val());
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


