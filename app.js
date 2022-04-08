const express = require("express");
const https =require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const api = "773df287cd69dbe508fea37392242cad"
  const units = "metric";
  const url= "https://api.openweathermap.org/data/2.5/weather?&q=" +query+ "&appid="+ api +"&units="+ units ;
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      res.write("<p>The weather is currently " + weatherDesc+"<p>");
      res.write("<h1>The temperature in "+ query+ " is " +temp +" degrees Celcius</h1>");
      res.write("<img src = "+imageURL+">");
      res.send();
      console.log(weatherDesc);
    })
  });
});

app.listen(process.env.PORT, function(){
  console.log("Server is running on Port 3000");
});
