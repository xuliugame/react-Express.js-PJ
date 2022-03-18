const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../index');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', function () {
  let id = null;

  // close server after done
  after(() => {
    server.close();
  });

  //post data  and add a record
  it('add', function (done) {
    chai.request(app)
      .post('/api/data')
      .send({
        Name: 'Emilia',
        Email: 'emilia@re.0',
        Age: 16,
        Status: true,
        Class: ['sleep']
      })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        // save id for further usage
        id = res.body.ID;
        done();
      });
  });

  // get a record by id
  it('get', function (done) {
    chai.request(app)
      .get('/api/data/' + id)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.ID).to.eq(id);
        done();
      });
  });

  // if getting record id not exists, the api will return 404
  it('get 404', function (done) {
    chai.request(app)
      .get('/api/data/123123')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  // query all records
  it('query all', function (done) {
    chai.request(app)
      .get('/api/data')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.eq(1);
        done();
      });
  });

  // query with criteria
  it('query with criteria', function (done) {
    chai.request(app)
      .get('/api/data/query?Name=emilia')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.length).to.eq(1);
        done();
      });
  });

  // update a record by id
  it('put', function (done) {
    chai.request(app)
      .put('/api/data/' + id)
      .send({
        Name: 'update'
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res.body.ID).to.eq(id);
        expect(res.body.Name).to.eq('update');
        done();
      });
  });

  // if id not exist, update will return 404
  it('put 404', function (done) {
    chai.request(app)
      .put('/api/data/123')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });

  // delete a record by id
  it('delete', function (done) {
    chai.request(app)
      .delete('/api/data/' + id)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  // if id not exist, delete will return 404
  it('delete 404', function (done) {
    chai.request(app)
      .delete('/api/data/123')
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
});