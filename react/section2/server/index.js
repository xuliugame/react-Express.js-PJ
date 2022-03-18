const express = require('express');
const app = express();
const uuid = require('uuid');
const path = require('path');

const router = express.Router();

// handle form and json post body
app.use(express.urlencoded());
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '../build')));

// router
app.use('/api/data', router);

// 2 strings Name, Email
// 1 boolean Status
// 1 array Class[]
// 1 number Age
// An ID - unique identifier. Use the uuid package to generate unique IDs.
const data = [];

// Create an endpoint that will query the dataset and return object(s) from it the based on certain criteria.
// query by name
router.get('/query', function (req, res) {
  // console.log(data);
  res.json(data.filter(v => v.Name.toLowerCase().indexOf(req.query.Name.toLowerCase()) >= 0));
});

// Create a GET ONE endpoint that returns one object from the dataset. req.param & :wildcardSyntax
router.get('/:id', function (req, res) {
  // find the item by id
  const item = data.find(v => v.ID === req.params.id);
  // if exists, return item and code 200, otherwise return code 404
  item ? res.json(item) : res.sendStatus(404);
});

// Create a GET endpoint that returns all objects from the array and sends them to the client.
router.get('/', function (req, res) {
  // return all items and code 200
  res.json(data);
});

// Create a POST endpoint that adds a new object to the array.
router.post('/', function (req, res) {
  // generate new item by request body, give new ID
  const item = {
    ...req.body,
    ID: uuid.v4()
  };
  // push to items
  data.push(item);
  // return this item
  res.status(201).json(item);
});

// Create a DELETE endpoint that can delete an object in the array.
router.delete('/:id', function (req, res) {
  // find item index by id
  const index = data.findIndex(v => v.ID === req.params.id);
  if (index >= 0) {
    // exists, remove it from items
    data.splice(index, 1);
    // send code 200
    res.sendStatus(200);
  } else {
    // not exists, send code 404
    res.sendStatus(404);
  }
});

// Create a PUT endpoint that can update an object in the array.
router.put('/:id', function (req, res) {
  // find item index by id
  const index = data.findIndex(v => v.ID === req.params.id);
  if (index >= 0) {
    // exists, update it
    data[index] = {
      ...data[index],
      ...req.body
    };
    // return new item and code 200
    res.json(data[index]);
  } else {
    // not exists, send code 404
    res.sendStatus(404);
  }
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops, something when wrong!');
});

// start server
const port = Number(process.env.PORT || 3000);
const server = app.listen(port, function () {
  console.log(`We are listening on port ${port}!`);
});

module.exports = { app, server };
