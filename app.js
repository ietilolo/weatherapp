/* jshint esversion: 6 */

// HTML Elements
let app_icon = document.querySelector( '#icon1' );
let app_temp = document.querySelector( '.app__temp' );
let app_degree = document.querySelector( '.app__degree' );
let app_description = document.querySelector( '.app__description' );
let app_timezone = document.querySelector( '.location__text' );

// Add Skycons
let skycons = new Skycons({color: "white"});
// skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
skycons.play();

// Credentials
const apiKey = "721ac3465a7178c4d0e757762e050599";
let proxy = "https://cors-anywhere.herokuapp.com/";
let apiReq = `${proxy}https://api.darksky.net/forecast/${apiKey}/`;

// User location and Data
let lat = "";
let long = "";
let coords = "";
let day = 1;
let degreeSetting;

window.navigator.geolocation.getCurrentPosition(position => {

    lat = position.coords.latitude;
    long = position.coords.longitude;
    coords = lat + ", " + long;
    apiReq += coords;

    setInterval( () => {


        // Fetch Weather Data
        fetch( apiReq ).then( response => {

            return response.json();

        }).then( data => {

            dataShort = data.currently;

            // Change Icon
            icon = dataShort.icon.replace( /-/g, '_') .toUpperCase();
            skycons.add( "icon1", Skycons[icon] );

            // Change Temperature
            if ( app_temp.innerText == "" ) {
                app_temp.innerText = dataShort.temperature;
            }

            // Change Description
            app_description.innerText = data.daily.data[0].summary;

            // Change App Timezone
            app_timezone.innerText = data.timezone.split( "/" )[1];

            // Extract Degree
            degreeSetting = dataShort.temperature;

        });

    }, 1000 );

});

app_degree.addEventListener( 'click', () => {

    let celcius = ( degreeSetting - 32 ) * 5 / 9;

    if ( app_degree.innerText == "Farenheit" ) {

        app_temp.innerText = Math.round(celcius);
        app_degree.innerText = "Celcius";

    } else {

        app_temp.innerText = degreeSetting;
        app_degree.innerText = "Farenheit";

    }

});