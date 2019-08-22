const dotenv = require('dotenv');

const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION SHUTTING DOWN');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

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
    console.log('DB connection is successfull!!!');
  });

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log('Your server is running on port 3000!!!')
);

process.on('unhandledRejection', err => {
  console.log('Error: ', err);
  console.log('UNHANDLED REJECTION: Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
