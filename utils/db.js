// import mysql from 'mysql2';

// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'EMS_DATABASE'
// });

// con.connect((err) => {
//   if (err) {
//     console.error('Connection Error:', err.message)
//   } else {
//     console.log("Connected to EMS_DATABASE");
//   }
// });

// export default con;

// 2-important
// import mysql from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config();

// const con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT
// });

// con.connect((err) => {
//   if (err) {
//     console.error('Connection Error:', err.message);
//   } else {
//     console.log("Connected to Clever Cloud MySQL Database");
//   }
// });  

// export default con;



import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection function that reconnects automatically
const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 10000 // Optional: Wait 10s before failing connection
});

// Connect to MySQL and handle errors
const connectWithRetry = () => {
  con.connect((err) => {
    if (err) {
      console.error('Connection Error:', err.message);
      setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
    } else {
      console.log("Connected to Clever Cloud MySQL Database ✅");
    }
  });
};

connectWithRetry();

// Keep the database alive to prevent timeout issues
setInterval(() => {
  con.query('SELECT 1', (err) => {
    if (err) {
      console.error('Keep-alive query failed ❌:', err);
      connectWithRetry(); // Reconnect if the query fails
    } else {
      console.log('Keep-alive query sent ✅');
    }
  });
}, 200000); // Runs every 5 minutes

export default con;
