const express = require("express");
const mongoose = require("mongoose");
const winston = require('winston');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 7000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//create a logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format:winston.format.combine(
        winston.format.colorize({all:true})
      )
    }),
    new winston.transports.File({ filename: 'error.log' ,level:'error'})
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ]
});

//routes
app.use('/', require('./routes/data'));


//connect to mongodb atlas
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongoDb atlas");
  })
  .catch((error) => {
    console.log(error.message);
  });

//start the server
app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
