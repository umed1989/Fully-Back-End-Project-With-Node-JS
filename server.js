const dotenv = require('dotenv');

const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection is successfully!!!');
  });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Your Port is running on port 3000'));
