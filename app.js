// Require HTTPs
const https = require('node:https');
// Require body-parser
const bodyParser = require('body-parser');
// Require Express
const express = require('express')

const app = express();

const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    const queryLat = req.body.lat;
    const queryLon = req.body.lon;
    const apiKey = "cf2990d311ccaae734928618cb2181eb";
    const unit = "metric"
    url = "https://api.openweathermap.org/data/2.5/weather?units="+ unit + "&lat=" + queryLat + "&lon=" + queryLon + "&appid=" + apiKey;
    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);

            weatherCountry = weatherData.sys.country;
            weatherTemp = weatherData.main.temp;
            weather = weatherData.weather[0].main
            imageUrl = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

            res.write("<h1>The temperature in " + weatherCountry + " is " + weatherTemp + " degrees Celcius.</h1>")
            res.write("<h2>The weather is currently " + weather + ".</h2>");
            res.write("<img src=" + imageUrl + ">")
            res.send();
        })
    })
})
app.listen(port, function(){
    console.log(`Example app listening on port ${port}`)
})