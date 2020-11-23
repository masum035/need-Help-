
var loc = document.getElementById("getLocation");
var hospitalDiv = document.getElementById('hospitalInfo');
var x;
let Address,Area,City,Distance,target_latitude,target_longtitude,target_name;
let ArrayOfPlaces=[];
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        loc.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let Longtitute = position.coords.longitude;
    let Langtiture = position.coords.latitude;
    let http = 'https://barikoi.xyz/v2/api/search/nearby/category/MTk5ODpOQVgzRkNIRVhS/1/10?longitude='+Longtitute+'&&latitude='+Langtiture+'&ptype=Healthcare';
    // fetch(http)
    //     .then(response => response.json())
    //     .catch(error => console.error('Error:', error))
    //     .then(response => console.log('Success:', response))
    fetch(http)
        .then(function (resp){
            return resp.json();
        })
        .then(function (data){
            console.log(data);
            ArrayOfPlaces = data.places;
            for (var i=0;i<10;i++){
                hospitalDiv.innerHTML = "<article class='post col-12'><div class='single-blog'><div class='post-contnet'> <h4 class='post-title text-custom-black'>"+
                    ArrayOfPlaces[i].name +"<br></h4>" +
                            "<p class='text-light-white'>" +
                    "hospital's city : " + ArrayOfPlaces[i].city  +"<br>"+
                    "hospital;s area : " + ArrayOfPlaces[i].area +"<br>"+
                    "hospital's Address : " + ArrayOfPlaces[i].Address +"<br>"+
                    "distance from your current location :<br>"+ ArrayOfPlaces[i].distance_in_meters +" meter<br>"+
                    "hospital's exact latitude : " + ArrayOfPlaces[i].latitude +"<br>"+
                    "hospital's exact longtitude : " + ArrayOfPlaces[i].longitude +"<br>"+
                "</p></div><div class='blog-overlay'><div class='right-text-effect post-content'> <h4 class='post-title'><a href='comment.html' class='text-white'>" +
                    ArrayOfPlaces[i].name + "</a><br></h4><p>" +
                    "hospital's city : " + ArrayOfPlaces[i].city  +"<br>"+
                    "hospital;s area : " + ArrayOfPlaces[i].area +"<br>"+
                    "hospital's Address : " + ArrayOfPlaces[i].Address +"<br>"+
                    "distance from your current location :<br>"+ ArrayOfPlaces[i].distance_in_meters +" meter<br>"+
                    "hospital's exact latitude : " + ArrayOfPlaces[i].latitude +"<br>"+
                    "hospital's exact longtitude : " + ArrayOfPlaces[i].longitude +"<br>"+
                "</p></div></div></div></article>" +
                    hospitalDiv.innerHTML;
            }
        });


    loc.innerHTML = "<h4>Your current Longitude: " + position.coords.longitude +
        "<br>Your current Latitude: " + position.coords.latitude + '<br></h4>';
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            loc.innerHTML = "User denied the request for Geolocation."
            alert("We are Sorry.\nMasum Production House is unable to provide service to you.\nAs you denied the GeoLocation request\nPlease Allow Access To Continue");
            break;
        case error.POSITION_UNAVAILABLE:
            loc.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            loc.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            loc.innerHTML = "An unknown error occurred."
            break;
    }
}