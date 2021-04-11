import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import Student from '../models/Student';
import Course from '../models/Course';
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
    
    const res = await request(app)
      .delete('/students/'+student.id)

    expect(res.statusCode).to.eql(204);
  })
})


describe('Courses', () => {
  beforeEach((done) => {
    Course.remove({}, (err) => {
      done();
    });
  });

  it('should create a new course', async () => {
    const res = await request(app)
      .post('/courses')
      .send(data.testCourse);

    expect(res.statusCode).to.eql(201);
    expect(res.body).to.haveOwnProperty('_id');
  })
  
  it('should delete a created course', async () => {
    const course = new Course(data.testCourse);
    
    const res = await request(app)
      .delete('/courses/'+course.id)

    expect(res.statusCode).to.eql(204);
  })

})