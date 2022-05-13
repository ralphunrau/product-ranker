require('dotenv').config();
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = process.env.PORT;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));


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
