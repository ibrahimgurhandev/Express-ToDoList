const PORT = process.env.PORT || 80;
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;
// const url = "mongodb+srv://demo:demo@cluster0-q2ojb.mongodb.net/test?retryWrites=true";
const url = "mongodb+srv://demo:demo@cluster0.84ovu.mongodb.net/demo2?retryWrites=true&w=majority"
const dbName = "demo2";

app.listen(PORT, () => {
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.get('/', (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {
      list: result
    })
  })
})

app.post('/list', (req, res) => {
  db.collection('list').insertOne({
    toDo: req.body.toDo
  }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.delete('/list', (req, res) => {
  db.collection('list').findOneAndDelete({
    toDo: req.body.toDo
  }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})