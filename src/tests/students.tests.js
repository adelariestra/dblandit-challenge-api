import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import Student from '../models/Student';
import data from './fixture.json'

describe('Students', () => {
  beforeEach((done) => {
    Student.remove({}, (err) => {
      done();
    });
  });

  it('should create a new student', async () => {
    const res = await request(app)
      .post('/students')
      .send(data.testStudent);

    expect(res.statusCode).to.eql(201);
    expect(res.body).to.haveOwnProperty('_id');
  })

  it('should delete a created student', async () => {
    const student = new Student(data.testStudent);
    await student.save();

    const res = await request(app)
      .delete('/students/' + student.id)

    expect(res.statusCode).to.eql(204);
  })

  it('should return not found when invalid student', async () => {
  });
  
})

