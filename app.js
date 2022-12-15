//const bodyParser = require("body-parser");
const { json } = require("body-parser");
const { response } = require("express");
const express = require("express");
const https = require("https");

const app = express();

app.set('view engine', 'ejs'); // using ejs

//app.use(bodyParser.urlencoded({extended:true}));

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.get('/' , function (req , res) {
    res.sendFile(__dirname + "/index.html") ;
       
});


// Intial Code

// app.post('/' ,function (req , res) {
//     const city = req.body.city;
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=795ec23728fe4887d68a1f19a278aeda&units=metric" ;
   
// https.get(url ,function (responce) {
//     responce.on('data' , function (data) { 
//         const WeatherData = JSON.parse(data);
//         const temp = WeatherData.main.temp;
//         const icon = WeatherData.weather[0].icon;
//         const ImageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

//         const WeatherDescription = WeatherData.weather[0].description;
//         res.write("<p>The Weather is Currently  " + WeatherDescription + "<p>" );
//         res.write("<h1>The Temprature In "+city+ " Is "+ temp + " Degree Celcisus</h1>");
//         res.write("<img src ="+ImageUrl+">");
//         res.send();

//     });    
// } );
   
// });


// Updated Code

app.post('/' , (req , res) =>{
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=795ec23728fe4887d68a1f19a278aeda&units=metric" ;

    https.get(url , (responce)=>{
        responce.on('data' , (data)=>{
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const icon = WeatherData.weather[0].icon;
            const ImageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

            const WeatherDescription = WeatherData.weather[0].description;
            const humidity = WeatherData.main.humidity;
            const speed = WeatherData.wind.speed;
            const min = WeatherData.main.temp_min;
            const max = WeatherData.main.temp_max;

            
            res.render('xyz', {whichcity: city , citytemp: temp , cityicon: ImageUrl ,
                description: WeatherDescription , cityHumidity: humidity ,windSpeed: speed,
                temMin: min , temMax: max  
            });
             
        })
   })

})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at Port 3000");
    
});







