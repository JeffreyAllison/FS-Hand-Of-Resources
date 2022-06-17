const express = require('express');
const path = require('path');

const app = express();

// Built in middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.use('/birds', require('./controllers/birds'));
app.use('/pets', require('./controllers/pets'));
// app.use('/guitars', require('./controllers/guitars'));
// app.use('/zodiacs', require('./controllers/zodiacs'));
// app.use('/albums', require('./controllers/albums'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
