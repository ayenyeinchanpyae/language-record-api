const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const languageRouters = require('./src/modules/language/routers');
const recordRouters = require('./src/modules/record/routers');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', languageRouters);
app.use('/api', recordRouters);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
