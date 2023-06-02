//what licence to choose
//where to host

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const {app} = require('./app')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const connection = mongoose.connect(process.env.DB_URI);
connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`app running on Port ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err}`),
  );