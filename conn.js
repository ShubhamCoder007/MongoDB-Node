const mongoose = require('mongoose');

//connecting, connection string
//connect returns a promise
// mongoose.connect('mongodb://localhost/playground')
// .then(() => console.log('connected to MongoDB...'))
// .catch(err => console.log('Some error occured: ',err));

mongoose.connect(
    'mongodb://localhost/playground',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    //   user: 'username', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
    //   pass: 'password', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
      dbName: 'playground', // IMPORTANT TO HAVE IT HERE AND NOT IN CONNECTION STRING
    },
    err => { throw err; },
  )
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.log('Some error occured: ',err));