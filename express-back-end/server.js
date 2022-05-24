require('dotenv').config();
const PORT = process.env.PORT;

const Express = require('express');

const BodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const cors = require('cors');
const { getWish, getUserById } = require('./db/db');

const App = Express();

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(cors());
App.set('view engine', 'ejs');

// setup morgan middleware
App.use(morgan('dev'));

// setup cookieSession
App.use(cookieSession({
  name: 'session',
  keys: ['secret', 'notEasy'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hour
}))

// Routers
const apiRoutes = require('./routes/apiRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const visionRoutes = require('./routes/visionRoutes');

App.use('/api', apiRoutes);
App.use('/products', productRoutes);
App.use('/user', userRoutes);
App.use('/vision', visionRoutes);

App.get('/basket/:id', (req, res) => {
  getWish(req.params.id)
    .then((wishResponse) => {
      getUserById(req.params.id)
        .then((userResponse) => {
          const templateVars = {
            products: wishResponse,
            user: userResponse.username
          };
          res.render('index', templateVars);
        })
    })
});


App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
