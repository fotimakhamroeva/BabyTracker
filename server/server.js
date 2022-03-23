const Express = require('express');
const Cors = require('cors')
const App = Express();
const BodyParser = require('body-parser');
const CookieSession = require('cookie-session')
const PORT = 8080;
const authRoutes = require('./routes/auth')
const logRoutes = require('./routes/log')
const babyRoutes = require('./routes/baby')

// Express Configuration
App.use(Cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
}))
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));
App.use(CookieSession({
    name: 'BabyTrackerSession',
    keys: ["BabyTrackerHelpsParentsTrackHealthAndVitalOfBaby"],
    maxAge: 72 * 60 * 60 * 1000 // 72 hours
}));

App.use('/api/auth', authRoutes);
App.use('/api/log', logRoutes);
App.use('/api/baby', babyRoutes);

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${PORT} so that's pretty good 👍`);
});