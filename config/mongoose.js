// required the library
const mongoose = require('mongoose');
// connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');
// acquire the connection for further use
const db = mongoose.connection;
// error
db.on('error',console.log.bind(console,'error connecting to db'));
// successfully connected then print this
db.once('open',function(){
    console.log("successfully connected to the database");
})