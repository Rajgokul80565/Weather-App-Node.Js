const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.set('view engine', 'ejs');
//body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// static files
app.use(express.static(__dirname + '/public'));


app.get("/", async (req, res)=>{
    const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=coimbatore&units=metric&appid=95fc7f893d69c69448ae4cc36eaf7f63");
    const data = await weather.json();
    const cityName = data.name;
    const temp = data.main.temp;
    const country = data.sys.country;
    const humidity = data.main.humidity;
    var id = data.weather[0].id;
    var icon;
    if(id < 300){
        icon = '/image/storm2.png';
    } else if(id < 400){
        icon = '/image/drizzle.png';
    } else if(id < 600 ){
        icon = '/image/rain1.png';
    } else if( id < 700){
        icon = '/image/snowman.png';
    } else if( id < 800){
        icon = '/image/mist.png';
    } else if(id === 800){
        icon = '/image/sunny.png';
    }else if( id <= 804){
        icon = '/image/cloudy-day.png';
    }
    const temperature = Math.round(temp);
    const description = data.weather[0].description;
    res.render('index', { 
        cityName:cityName,
         temperature:temperature, 
         description:description,
         country: country,
         icon : icon,
         humidity:humidity,

    });
})

app.post('/', async (req, res)=>{
    const location = req.body.location;
    console.log(location);
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=95fc7f893d69c69448ae4cc36eaf7f63`);
    
    const data = await weather.json();
    console.log(data);
    const cityName = data.name;
    const temp = data.main.temp;
    const temperature = Math.round(temp);
    const description = data.weather[0].description;
    const country = data.sys.country;
    const humidity = data.main.humidity;
    var id = data.weather[0].id;
    var icon;
    if(id < 300){
        icon = '/image/storm2.png';
    } else if(id < 400){
        icon = '/image/drizzle.png';
    } else if(id < 600 ){
        icon = '/image/rain1.png';
    } else if( id < 700){
        icon = '/image/snowman.png';
    } else if( id < 800){
        icon = '/image/mist.png';
    } else if(id === 800){
        icon = '/image/sunny.png';
    }else if( id <= 804){
        icon = '/image/cloudy-day.png';
    }
    res.render('index', {
         cityName:cityName,
          temperature:temperature, 
          description:description,
          country: country,
          icon : icon,
          humidity:humidity,
        });
})


app.get('/about', (req, res)=>{
        res.render('about');
})

app.listen(3000,()=>{
    console.log("Server 3000 is running ....");
})