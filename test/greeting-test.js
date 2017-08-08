'use strict';

const test = require('tape');
const supertest = require('supertest');

const app = require('../app');

test('test out greeting route with no query param', (t) => {
  supertest(app)
    .get('/api/greeting')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      t.equal(response.body.content, 'Hello, World');
      t.end();
    });
});

test('test out greeting route with a query param', (t) => {
  supertest(app)
    .get('/api/greeting?name=Luke')
    .expect('Content-Type', /json/)
    .expect(200)
    .then(response => {
      t.equal(response.body.content, 'Hello, Luke');
      t.end();
    });
});

test('test out greeting route after /killme route', (t) => {
  supertest(app)
    .get('/api/killme')
    .expect(200)
    .then(response => {
      t.equal(response.text, 'Stopping HTTP server, Bye bye world !', 'kill me endpoint reponse text');
      return supertest(app)
        .get('/api/greeting')
        .expect(400);
    }).then(response => {
      t.end();
    });
});
