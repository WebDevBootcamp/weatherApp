
// This is the API key for the Darksky
var darkskyApiKey = "e613cb7a347d7b343ec0c209b9b84e76";
// http://api.geonames.org/searchJSON?q=new&maxRows=1&username=davidjones


//once the document is ready
$(function(){

  // Establish a "Click" event
  $("#weatherSubmit").click(function(){

    // Take the city name from the HTML input filed with the ID of "cityName" and put it in a var
    var cityName = $("#cityName").val()

    // This calls the function that converts the cityName to lat/lng
    cityName2LatLong(cityName, function(returnedCityData){
      // IN this callback, returnedCityData is an object with following the properties:
      // lat
      // lng
      // name
      //
      // (see below)

      // Run the "getWeather" function and pass the lat, lng, and cityName to it.
      getWeather(returnedCityData.lat,returnedCityData.lng, returnedCityData.name)
    })
  })
})

// this function accesses the GEONAMES.ORG API to convert a city name into lat/long
function cityName2LatLong(cityName, cb){

  // set up our params for $.ajax to use
  var params = {
    url : "http://api.geonames.org/searchJSON?q=" + cityName + "&maxRows=1&username=davidjones"
  }

  // Make the API call to the GEONAMES API
  $.ajax(params).done(function(data){

    // what does the data look like?
    console.log(data);

    // Take the data that we retrieved from the GEONAMES API and put the values we need into an obj
    var cityData = {
      name : data.geonames[0].name,
      lat : data.geonames[0].lat,
      lng : data.geonames[0].lng
    }

    // return that object to the calling function as a CALLBACK
    return cb(cityData)
  })

  /// cb(lat,lng)
}

// This function gets the weather from the DARKSKY API using a LAT and LNG
function getWeather(lat,lng, cityValue){
  // https://api.darksky.net/forecast/e613cb7a347d7b343ec0c209b9b84e76/40.585260,-105.084423

  // THe params for the $.ajax call
  var params ={
    url: "https://api.darksky.net/forecast/" + darkskyApiKey + "/" + lat + "," + lng,
    context: document.body,
    dataType: "jsonp",
  }



  // Make the call to the API
  $.ajax(params).done(function(data) {
    // this callback brings in "data" which contains our weather information

    // console.log the weather information
    console.log(data);

    // Set the temperature in the DOM
    $("#temp").text(data.currently.temperature)

    // Set the city name in the DOM
    $("#cityValue").text(cityValue)

    // Show the div that contains the weather information
    $(".hidden").removeClass("hidden")
  });
}
