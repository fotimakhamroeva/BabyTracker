const Express = require('express');
const Cors = require('cors')
const App = Express();
const BodyParser = require('body-parser');
const CookieSession = require('cookie-session')
const PORT = 8080;
const authRoutes = require('./routes/auth')
const logRoutes = require('./routes/log')
const babyRoutes = require('./routes/baby')
const pg = require('pg');
const Client = pg.Client;
// const db = require('./db')

const configObj = {
  user: 'labber',
  host:'localhost',
  database:'baby_tracker',
  password:'labber',
  port: 5432
}

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

const client = new Client(configObj);
console.log('Db connection info:', configObj);
client.connect()
.then(() => {
  console.log('db connected');
})
.catch((error) => {
  console.log('db connection errors:', error)  
});

App.use('/api/auth', authRoutes(client));
App.use('/api/baby', babyRoutes(client));
App.use('/api/log', logRoutes(client));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is listening on port ${PORT} so that's pretty good 👍`);
});






// const verb = process.argv[2];

// switch(verb){
//   case 'browse': 
// // App.get('/register', (req,res) => {
  
//     client.query('SELECT * FROM parent ORDER BY id;')
//     .then((response) => {
//       response.rows.forEach((row) => {
//         console.log(`${row.id},${row.first_name}, ${row.last_name}  ${row.email}`)

//       })
//     })
//     .catch((error) => {
//       console.log('db browse error:',error);
//     });
//   // }
//   // )
  
// }