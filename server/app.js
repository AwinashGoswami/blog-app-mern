
const express = require('express');
const app = express();
const appRoute = require('./routes/appRoutes');
const userRoute = require('./routes/userRoutes');
const postRoute = require('./routes/postRoutes');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;

require('./database/conn');
require('./models/userSchema')

app.use(express.json());
app.use('/', appRoute);
app.use('/', userRoute);
app.use('/', postRoute);

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
})