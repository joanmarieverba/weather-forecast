// var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=Minneapolis,us&cnt=10&APPID=2ab5a5b18737e945b5af9cae2e8e1ffe";
// 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + encodeURIComponent(cityQuery) + '&cnt=10' + '&APPID=' + apiKey);

// This gives a "loading" icon when data is loading
$body = $("body");

$(document).bind({
   ajaxStart: function() { $body.addClass("loading");   },
   ajaxStop:  function() { $body.removeClass("loading");}
});

function kelvinToFahrenheit(kelvin) {
  return Math.round(kelvin * (9/5) - 459.67);
}

function mpsToMph(mps) {
  return Math.round(mps/.44704);
}

function unixToDay(timestamp) {
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp*1000);
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let weekday = weekdays[date.getDay()];
    return weekday;
}

/////////////
function locationButtonClick (){
  console.log ("button was clicked", $("#zip").val());
  getWeatherData($("#zip").val());
  $(".displayCondition").css("display", "inline-block");
}

$("#btn").on("click",locationButtonClick);

function getWeatherData (zipCode){
  let url = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + zipCode + "&cnt=10&APPID=2ab5a5b18737e945b5af9cae2e8e1ffe";

$.ajax({

  url: url,
  success: function(result){
    console.log(result);

  let cityName = result.city.name;
  displayCityName = `for ${cityName}`;
  $("#weather_place").text(displayCityName);


  for (var i = 0; i < 7; i++) {

    let int = i.toString();

    let dayOfWeek = unixToDay(result.list[i].dt);
    console.log ("day ", result.list[i].dt);
    $("#day"+int).text(dayOfWeek);

    let iconUrl = 'http://openweathermap.org/img/w/'+result.list[i].weather[0].icon+'.png';
    $("#weather_img_icon"+int).attr("src", iconUrl);

    let cloudiness = result.list[i].weather[0].description;
    $("#weather_desc"+int).text(cloudiness);

    let highTemp = kelvinToFahrenheit(result.list[i].temp.max);
    let displayHighTemp = `High ${highTemp}&#176;F`;
    $("#high"+int).html(displayHighTemp);

    let lowTemp = kelvinToFahrenheit(result.list[i].temp.min);
    let displayLowTemp = `Low ${lowTemp}&#176;F`;
    $("#low"+int).html(displayLowTemp);



//end of for var loop
  }

}
});
}
