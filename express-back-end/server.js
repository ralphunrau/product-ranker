require('dotenv').config();
const PORT = process.env.PORT;

const Express = require('express');

const BodyParser = require('body-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

const App = Express();

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

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
const favoriteRoutes = require('./routes/favoriteRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

App.use('/api', apiRoutes);
App.use('/favorites', favoriteRoutes);
App.use('/categories', categoryRoutes);
App.use('/products', productRoutes);
App.use('/user', userRoutes);

// Sample GET route
// App.get('/', (req, res) => {
//   console.log(res);
// });

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
