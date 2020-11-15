const express = require('express');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 8080;

// app.use(express.static(path.join(__dirname, '../frontend', 'build')));

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>');
// });

app.get('/api/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.get('/api/posts', (req, res) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => res.json(json));
});

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server Listening on Port ${PORT}`);
});
