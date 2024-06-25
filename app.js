import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index", { weather: '', city_exist: null });
});

let city = '', country = '';

app.post('/weather', async (req, res) => {
    // take input from ejs file for the country and city 
    city = req.body.city;
    country = req.body.country;
    // take data of the place from the api call   
    const weat = `https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=e142737447ea46a991b340a45a4225bf`

    try {
        const response = await axios.get(weat);

        const data = response.data.data[0];
        const city_exist = data ? data.lat : 0;
        console.log(city_exist);

        if (city_exist === 0) {
            res.render("index.ejs", { weather: '', city_exist: 0 });
        } else {
            res.render('index', { weather: data, city_exist: 1 });
        }
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        res.render('index', { weather: null, city_exist: 0 });
    }
});

app.listen(port, () => {
    console.log((`app listening on the port ${port}`));
});
