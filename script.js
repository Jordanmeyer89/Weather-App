$(document).ready(function(){
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = position.coords.latitude;
      //$("#lat").html("lat =" + lat);
      var lon = position.coords.longitude;
      //$("#lon").html("lon =" + lon);
      currentWeather(lat,lon);
    })};
  
  
  
 function currentWeather(lat,lon) {
  var url = "http://api.openweathermap.org/data/2.5/weather";
  $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        lat: lat,
        lon: lon,
        APPID: "3bc88ccd18e95ce402d1aeb7560d01ae",
        units: "imperial"
      }
    })
    .done(function(data) {
    //console.log(data);
    var country = data.sys.country;
    var sunrise = new Date(data.sys.sunrise*1000);
    var srhours = sunrise.getHours();
    var srminutes = "0" + sunrise.getMinutes();
    var srseconds = "0" + sunrise.getSeconds();
    var srTime = srhours + ':' + srminutes.substr(-2) + ':' + srseconds.substr(-2);   
    var sunset = new Date(data.sys.sunset*1000);
    var sshours = sunset.getHours();
    var ssminutes = "0" + sunset.getMinutes();
    var ssseconds = "0" + sunset.getSeconds();
    var ssTime = sshours + ':' + ssminutes.substr(-2) + ':' + ssseconds.substr(-2);
    var forecast = data.weather[0]["main"];
    var icon = data.weather[0].icon;
    //console.log(icon);
    var description = data.weather[0].description;
    var temp_min = data.main.temp_min;
    var temp = data.main.temp;
    window.temp = temp;
    var temp_max = data.main.temp_max;
    var humidity = data.main.humidity;
    var pressure = data.main.pressure;
    var speed = data.wind.speed;
    //var rain = data.rain["3h"];
    var city = data.name;
    var time = data.dt;
    var tUnit = "F"
    var windDeg = data.wind.deg;
    var windDir = "";
    if ((windDeg > 315) || (windDeg < 45)){
        windDir =  "South";
      } else if ((windDeg > 45) && (windDeg < 135)){
        windDir = "West";
      } else if ((windDeg > 135) && (windDeg < 225)){
        windDir = "North";
      } else if ((windDeg > 225) && (windDeg < 315)){
        windDir = "East";
      };

       
      $('#sunrise').html(srTime);
      $('#sunset').html(ssTime);
      $('#main').html("Today's forecast: " + forecast);
      //$('#description').html("Forecast: " + forecast);
      //$('#temp_min').html("Temp low " + temp_min + "°F");
      $('#temp').html(temp  + " °" + tUnit);
      //$('#temp_max').html("Temp high " + temp_max + "°F");
      $('#humidity').html(humidity + "%");
      $('#pressure').html(pressure + " mbar");
      $('#speed').html(speed + " mph " + windDeg +"° " + windDir);
      //$('#rain').html(rain);
      $('#city').html(city);
    
    $("#icon").attr("src",( "http://openweathermap.org/img/w/" + icon + ".png"));
    
 if (tUnit == "F") {   $("#fahrenheit").prop({disabled:true});
 $("#celsius").prop({disabled:false});
    } else if (tUnit == "C"){
 $("#celsius").prop({disabled:true});     $("#fahrenheit").prop({disabled:false})}
    
    })
  
    .fail(function(err) {
      console.log(err);
    });
}
});
console.log(temp);

function toCelsius(degF){
    return (degF-32)*(5/9);
  }
  
  function toFahrenheit(temp){
    return temp;
  }
function cClick(){
    var newTemp = toCelsius(temp).toFixed(2);
    tUnit = "C";
    $('#temp').html(newTemp  + " °" + tUnit);
    if (tUnit == "F") {   $("#fahrenheit").prop({disabled:true});
 $("#celsius").prop({disabled:false});
    } else if (tUnit == "C"){
 $("#celsius").prop({disabled:true});     $("#fahrenheit").prop({disabled:false})}
  }
  
  function fClick(){
    var newTemp = toFahrenheit(temp);
    tUnit = "F";
    $('#temp').html(newTemp  + " °" + tUnit);
    if (tUnit == "F") {   $("#fahrenheit").prop({disabled:true});
 $("#celsius").prop({disabled:false});
    } else if (tUnit == "C"){
 $("#celsius").prop({disabled:true});     $("#fahrenheit").prop({disabled:false})}
  
  }
  
$("#celsius").on("click",cClick);
      $("#fahrenheit").on("click",fClick);

//api key = 3bc88ccd18e95ce402d1aeb7560d01ae 

