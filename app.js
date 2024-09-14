const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const ejs = require('ejs');
const helmet = require('helmet');

app.use(bodyParser.urlencoded({extended:true}));
    
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use(helmet());

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
        });

app.post("/", function(req,res){
    const city = req.body.cityName;
    const apiKey = "d19e5a2ad39a7bf45731c9059b87474e";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+ apiKey +"&units="+ unit;
    https.get(url, function(response){
                response.on("data",function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp; 
                const weatherDisc=weatherData.weather[0].description;
                const weatherImg=weatherData.weather[0].icon;
                const imageUrl ="https://openweathermap.org/img/wn/"+weatherImg+"@2x.png";

                res.render('condition', {
                    city: city,
                    temp: temp,
                    weatherDesc: weatherDisc,
                    imageUrl: imageUrl
                });
    });
    
});
        }); 

        

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000");
});