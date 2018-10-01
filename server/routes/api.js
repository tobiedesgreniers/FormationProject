const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const router = express.Router();

//uri of the database
const uri = ('mongodb://localhost:27017/sprints');

/* GET home page.
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});
*/

//Get all the sprints stored in the database
router.route('/sprints').get((req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    var db = client.db('sprints');
    db.collection("sprintCollection").find({}).toArray((err, sprints) => {
      assert.equal(null, err);
      res.json(sprints);
      client.close();
    });
  });
});

//Get all the sprint templates stored in the database
router.route('/templates').get((req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    var db = client.db('sprints');
    db.collection('sprintTemplates').find({}).toArray((err, sprintTemplates) => {
      assert.equal(null, err);
      res.json(sprintTemplates);
      client.close();
    });
  });
});

//Post a new sprint to the database
router.route('/sprints/add').post((req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    var db = client.db('sprints');
    assert.equal(null, err);
    db.collection("sprintCollection").insertOne(req.body);
    res.send('Data received:\n' + JSON.stringify(req.body));
    client.close();
  });
});

//Delete all sprints stored in the database
router.route('/sprints/delete').get((req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    assert.equal(null, err);
    var db = client.db('sprints');
    db.collection("sprintCollection").deleteMany({}, ()=> {
      client.close();
    });
  });
});
module.exports = router;