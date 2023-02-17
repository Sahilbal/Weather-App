const express =require ("express");
const https = require("https");
const bodyParser = require("body-parser");
const { getUnpackedSettings } = require("http2");
var center = require('center-align');
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  console.log(req.body.cityName);
 const query = req.body.cityName;
 const apiKeys = "ea2e47abc527b74906b94d0cdc22b624";
 const units = "metric";
 
 const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKeys+"&units="+ units;
 https.get(url,function(response){
console.log(response.statusCode);
response.on("data",function(data){
  const weatherApp = JSON.parse(data);
  const temp = weatherApp.main.temp;
  const description = weatherApp.weather[0].description;
  const icon= weatherApp.weather[0].icon;
  const iconUrl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";
  res.write("<p style='text-align:center ; font-weight :normal; margin-top:10%;'>The weather is currently "+description+"</p>");
  res.write("<h1 style='text-align:center;'>The temperature of "+query+" is "+temp+" degrees celcius.</h1>")
  res.write(" <div style = 'text-align:center;'> <img src="+iconUrl+"> </div>");

  res.send();

});
 });

  });


app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});