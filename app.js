import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const app=express();
const port=3000;

app.set("view engine","ejs");

 app.use(express.static('public'));
 app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render("index",{weather:""});
})
 let city='',country='';

app.post('/weather',async (req,res)=>{
   // take input from ejs file for the country and city 
       city=req.body.city;
       country=req.body.country;
    // take data of the place from the api call   
       const weat=`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=e142737447ea46a991b340a45a4225bf`

  try{
    const response=await axios.get(weat);
    // console.log(response.data);

    
        const data = response.data.data[0];
        console.log(data);
     
    
        res.render('index', { weather:data });
   

} catch (error) {
    console.error("Error fetching the weather data:", error);
    res.render('index', { weather: null });
}
});
 
app.listen(port,(req,res)=>{
    console.log((`app listening on the port ${port}`));
}) 