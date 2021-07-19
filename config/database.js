// database connectivity
const mongoose = require('mongoose');

mongoose.connect('mongodb://'+process.env.HOST+'/'+process.env.DBNAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

