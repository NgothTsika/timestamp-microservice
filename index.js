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

// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors());
// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send("Header Parser Microservice is running!");
// });

// app.get("/api/whoami", (req, res) => {
//   res.json({
//     ipaddress: req.ip,
//     language: req.headers["accept-language"],
//     software: req.headers["user-agent"],
//   });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

//TEST 3

const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("dns");
const urlParser = require("url");
const shortid = require("shortid");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const urls = {}; // In-memory storage

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// POST endpoint to shorten a URL
app.post("/api/shorturl", (req, res) => {
  const original_url = req.body.url;
  const hostname = urlParser.parse(original_url).hostname;

  dns.lookup(hostname, (err) => {
    if (err) {
      return res.json({ error: "invalid url" });
    } else {
      const short_url = shortid.generate().slice(0, 6);
      urls[short_url] = original_url;
      return res.json({ original_url, short_url });
    }
  });
});

// GET endpoint to redirect to original URL
app.get("/api/shorturl/:short_url", (req, res) => {
  const short_url = req.params.short_url;
  const original_url = urls[short_url];

  if (original_url) {
    res.redirect(original_url);
  } else {
    res.status(404).json({ error: "No short URL found for given input" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
