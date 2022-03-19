const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const authRoutes = require('./routes/auth')

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

App.use('/api/auth', authRoutes);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${PORT} so that's pretty good 👍`);
});