// Imports all modules
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

// Settings
// Handlebars
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static('public'));


// Routing
app.get('/', (req,res) => {
    res.render('index', { title: 'Cryptonite' });
});

app.listen(3030, console.log('Listening to 3030...'));