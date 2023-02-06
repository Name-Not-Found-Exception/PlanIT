const {MongoClient} = require("mongodb");

let mongo;
let db;

const fs = require('fs');
async function insertUserDetails(details){
    mongo = await MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }); 
    db = mongo.db("test");
    await db.collection('users').insertOne(details);
    mongo.close();
    return "Sign in successfull";

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
  return "Sign in successfull";
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

app.get('/api/send-register', (req, res) => {
 // console.log("helloworld");
  const inputValue = req.query.value;
  console.log(JSON.parse(inputValue)['name']);
  const message = insertUserDetails(JSON.parse(inputValue));
  res.send({ message });
});

app.get('/api/getusers',async (req, res) => {
    // console.log("helloworld");
    
     const message =await getUsers();
     console.log(message);
     res.send(JSON.stringify(message));
   });
   const upload = multer({ dest: 'uploads/' });
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
result = insertEvent(eventdata);



     res.send(result);
   });