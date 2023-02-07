const {MongoClient} = require("mongodb");

let mongo;
let db;
let curUser = {};
const fs = require('fs');
async function insertUserDetails(userDetails){

    let isok = false;
    
    
    mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
    db = mongo.db("test");
    console.log(userDetails['email']);
    const givenmail = userDetails['email'];
    user = await db.collection('users').find({"email": givenmail}).limit(1).toArray();
    console.log(user);
    if(user.length==0){
    await db.collection('users').insertOne(userDetails);
    mongo.close();
    return "Signup successful";
    }
    else
    return "email already exist"

}
async function getUsers(){
    mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
    db = mongo.db("test");
    let res = await db.collection('users').find({}).toArray();
    
    mongo.close();
    return res;
    
    }
async function insertEvent(data){
 
  mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
  db = mongo.db("test");
  await db.collection('events').insertOne(data);
  mongo.close();
  return " successfull";
  

}

async function getEvents(){

  mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
  db = mongo.db("test");
  let res = await db.collection('events').find({}).toArray();
  
  mongo.close();
  return res;
}



async function login(cred){
  mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
  db = mongo.db("test");
  console.log(cred["email"]);
  const givenmail = cred['email'];
  user = await db.collection('users').find({"email": givenmail}).limit(1).toArray();
  console.log(user);
  if(user.length==0){
  return "User not found";
  }
  else
  {
    console.log(user[0]['password']);
    console.log(console.log(user[0]['password\n']));
    if(cred['password'] == user[0]['password']){
    curUser =  user[0];
    console.log('current user '+curUser['name']);
    return "Login Successful";
    
    }
    else
    return "incorrect password"
  }
}

    const multer = require('multer');
    const path = require('path');

const express = require('express');
const app = express();

app.use(express.static('public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/api/send-register',async (req, res) => {
 // console.log("helloworld");
  const inputValue = req.query.value;
  const userdetails = JSON.parse(inputValue);
  console.log(userdetails['email']);
  const message =await insertUserDetails(userdetails);
  res.send({ message });
});

app.get('/api/getusers',async (req, res) => {
    // console.log("helloworld");
    
     const message =await getUsers();
     console.log(message);
     res.send(JSON.stringify(message));
   });
   const upload = multer({ dest: 'public/uploads/' });
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   
   app.post('/api/events', upload.single('image'), (req, res) => {
const { eventTitle, location, date, time } = req.body;
const image = req.file;
let result;
console.log(eventTitle);

 const eventdata = {
  title:eventTitle,
  location:location,
  date:date,
  time:time,
  image:image
}
console.log(eventdata);
result = insertEvent(eventdata);



     res.send(result);
   });

   app.get('/api/getevents',async (req, res) => {
    // console.log("helloworld");
    
     const message =await getEvents();
     console.log(message);
     res.send(JSON.stringify(message));
   });

   app.get('/api/send-login',async (req, res) => {
    // console.log("helloworld");
     const inputValue = req.query.value;
     console.log(JSON.parse(inputValue)['name']);
     const message =await login(JSON.parse(inputValue));
     res.send({ message });
   });