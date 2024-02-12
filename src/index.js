const express = require('express');
const mongoose = require('mongoose')
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/authMiddleware')

const routes = require('./routes');


const app = express();
const port = 5000;

app.engine('hbs' , handlebars.engine({
    extname : 'hbs',
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(auth);

app.use(routes);


mongoose.connect(`mongodb://localhost:27017/magic-movies`)
    .then(() => {
        console.log('DB Connected');

        app.listen(port, () => console.log(`Server is listening on port ${port}....`))
    })
    .catch(err => console.log('Cannot connect to DB'))
