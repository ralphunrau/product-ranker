const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));


// Routers
const apiRoutes = require('./routes/apiRoutes')

App.use('/api', apiRoutes);
App.use('/favorites', userRoutes);
App.use('/categories', categoryRoutes);
App.use('/products', productRoutes);



// Sample GET route
App.get('/', (req, res) => {
  console.log(res);
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
