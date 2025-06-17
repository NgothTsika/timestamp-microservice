// const express = require('express');
// const cors = require('cors');
// const app = express();

// app.use(cors());

// // Default route
// app.get('/', (req, res) => {
//   res.send('Timestamp Microservice is up!');
// });

// // No date provided → use current time
// app.get('/api', (req, res) => {
//   const now = new Date();
//   res.json({
//     unix: now.getTime(),
//     utc: now.toUTCString(),
//   });
// });

// // Date parameter route
// app.get('/api/:date', (req, res) => {
//   const { date } = req.params;

//   // Check if the input is only digits → treat as Unix timestamp (in milliseconds or seconds)
//   let parsedDate;
//   if (/^\d+$/.test(date)) {
//     const timestamp = parseInt(date);

//     // If it's 13 digits, it's already in ms. If 10, convert to ms
//     parsedDate = new Date(
//       date.length === 13 ? timestamp : timestamp * 1000
//     );
//   } else {
//     // Else, treat as a date string
//     parsedDate = new Date(date);
//   }

//   // Handle invalid dates
//   if (parsedDate.toString() === 'Invalid Date') {
//     return res.json({ error: 'Invalid Date' });
//   }

//   // Valid response
//   res.json({
//     unix: parsedDate.getTime(),
//     utc: parsedDate.toUTCString(),
//   });
// });

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//TEST 2

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Header Parser Microservice is running!");
});

app.get("/api/whoami", (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
