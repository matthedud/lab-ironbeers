const express = require('express');

const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    res.render('beers', { beers });
  } catch (error) {
    console.log('error', error);
  }
});

app.get('/beers/id', async (req, res) =>{
  
})

app.get('/random-beer', async (req, res) => {
  try {
    const data = await punkAPI.getRandom();
    res.render('random-beer', data[0]);
  } catch (error) {
    console.log('error', error);
  }
});



app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
