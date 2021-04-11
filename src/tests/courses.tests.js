import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import Course from '../models/Course';
import data from './fixture.json'


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
        await course.save();

        const res = await request(app)
            .delete('/courses/' + course.id)

        expect(res.statusCode).to.eql(204);
    })

    it('should list all courses', async () => {
        const course = new Course(data.testCourse);
        const course2 = new Course(data.testCourse);
        course.save();
        course2.save();

        const res = await request(app)
            .get('/courses')

        expect(res.statusCode).to.eql(200);
        expect(res.body.length).to.eql(2);
    });

    it('should list all courses even if list is empty', async () => {
        const res = await request(app)
            .get('/courses')

        expect(res.statusCode).to.eql(200);
        expect(res.body.length).to.eql(0);
    });

    it('should get a course detail with students', async () => {
        const course = new Course(data.testCourseTwoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/'+course.id)

        expect(res.statusCode).to.eql(200);
        expect(res.body.students.length).to.eql(2);
    });

    it('should return not found when invalid course', async () => {
        const course = new Course(data.testCourse);
        course.save();

        const res = await request(app)
            .get('/courses/'+'nnnn')

        expect(res.statusCode).to.eql(404);
    });

    it('should get a course detail even with empty students', async () => {
        const course = new Course(data.testCourse);
        course.save();

        const res = await request(app)
            .get('/courses/'+course.id)

        expect(res.statusCode).to.eql(200);
        expect(res.body.students.length).to.eql(0);
    });

    it('should get only the course students', async () => {
        
    });

    it('should get only the course students even with empty list', async () => {
    });

    it('should get the best student', async () => {
    });

    it('should get the best student even with empty students', async () => {
    });

    it('should get the best student even with only one student', async () => {
    });

})