const express  = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
// importing schema
const Contact = require('./models/Contact');
//firing up express
const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
// middlewares
app.use(express.urlencoded());

// To serve static files such as images, CSS files, and JavaScript files, use the express. static built-in
//  middleware function in Express. The root argument specifies the root directory from which to serve static assets.

app.use(express.static('assets'));


app.get('/',function(req,res){

    // fetching data from mongodb using Contact (ye contact whi mongoose wala variable h)
    Contact.find({},(err, contacts)=>{
        if(err)
        {
            console.log("Error in fetching contacts from DB");
            return;
        }
        return res.render('home',{
            title: "My Contacts List",
            contact_list: contacts
        });
    });
    
})


app.post('/create-contact/',(req,res)=>{
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, (err,newContact)=>{
        if(err)
        {
            console.log("error in creating a contact");
            return;
        }
        return res.redirect('back');
    })
})


// for deleteing a contact
app.get('/delete-contact/',(req,res)=>{
    // get the id from query in the url
    let ID = req.query.id;
// find the contact in the database using id and delete it
    Contact.findByIdAndDelete(ID, (err)=>{
        if(err)
        {
            console.log("Error in deleting an object from database");
            return;
        }
        return res.redirect('back');
    })
})


app.listen(port,function(err){
    if(err) console.log("error in running your server",err);
    else
    console.log("my express server is running on port: ",port);
})