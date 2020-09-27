window.addEventListener('load',()=> {
    var long;
    var lat;
    var temperatureDescription = document.querySelector('.temperature-description');
    var temperatureDegree = document.querySelector('.temperature-degree');
    var locationTimezone = document.querySelector('.location-timezone');
    var img = document.createElement("img"); 

    function toTitleCase(str) {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            var api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long + '';
            // var api = 'https://fcc-weather-api.glitch.me/api/current?lat=49.2606&lon=-123.2460'; // Vancouver, CA
            // var api = 'https://fcc-weather-api.glitch.me/api/current?lat=51.509865&lon=-0.118092'; // London, GB
            fetch(api)
                .then(response =>{
                 return response.json();
                })
                .then(data => {
                    // console.log(data);
                    
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = data.main.temp;
                    temperatureDescription.textContent = toTitleCase(data.weather[0].description);
                    locationTimezone.textContent = data.name + ", " + data.sys.country;

                    img.src = data.weather[0].icon; 
                    var src = document.getElementById("icon");                  
                    src.appendChild(img).width = "100";

                });
            });
    }
});