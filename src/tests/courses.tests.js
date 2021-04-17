import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import Course from '../models/Course';
import data from './fixture.json'
import Student from '../models/Student';


describe('Basic Course Operations', () => {
    beforeEach((done) => {
        Course.remove({}, (err) => {
            done();
        });
    });

    it('should create a new course', async () => {
        const res = await request(app)
            .post('/courses')
            .send(data.testCourseNoStudents);

        expect(res.statusCode).to.eql(201);
        expect(res.body).to.haveOwnProperty('_id');
    })

    it('should delete a created course', async () => {
        const course = new Course(data.testCourseNoStudents);
        await course.save();

        const res = await request(app)
            .delete('/courses/' + course.id)

        expect(res.statusCode).to.eql(204);
    })

    it('should list all courses', async () => {
        const course = new Course(data.testCourseNoStudents);
        const course2 = new Course(data.testCourseNoStudents);
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


});

describe('Detailed Courses', () => {
    beforeEach((done) => {
        Course.remove({}, (err) => {
            done();
        });
    });

    it('should get a course detail with students', async () => {
        const course = new Course(data.testCourseTwoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/' + course.id)

        expect(res.statusCode).to.eql(200);
        expect(res.body.students.length).to.eql(2);
    });

    it('should get a course detail even with empty students', async () => {
        const course = new Course(data.testCourseNoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/' + course.id)

        expect(res.statusCode).to.eql(200);
        expect(res.body.students.length).to.eql(0);
    });
    
    it('should return invalid course if invalid', async () => {
        const course = new Course(data.testCourseNoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/' + 'nnnn')

        expect(res.statusCode).to.eql(422);
    });
    
    it('should return not found when course does not exist', async () => {
        const course = new Course(data.testCourseNoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/' + '0000ffd60bbe4d3f1855c252')

        expect(res.statusCode).to.eql(404);
    });
});

describe('Course Students', () => {
    beforeEach((done) => {
        Course.remove({});
        Student.remove({}, (err) => {
            done();
        });
    });
    it('should get only the course students', async () => {
        const course = new Course(data.testCourseTwoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/' + course.id + '/students')

        expect(res.statusCode).to.eql(200);
        expect(res.body.length).to.eql(2);
    });

    it('should get only the course students even with empty list', async () => {
        const course = new Course(data.testCourseNoStudents);
        course.save();

        const res = await request(app)
            .get('/courses/' + course.id + '/students')

        expect(res.statusCode).to.eql(200);
        expect(res.body.length).to.eql(0);
    });
});

describe('Course best student', () => {
    beforeEach((done) => {
        Course.remove({});
        Student.remove({}, (err) => {
            done();
        });
    });

    it('should get the best student', async () => {
        const student = new Student(data.testStudent);
        await student.save();
        const student2 = new Student(data.testStudent2);
        await student2.save();

        const courseObj = {
            ...data.testCourseNoStudents,
            students: [{
                student: student.id,
                score: 9
            },
            {
                student: student2.id,
                score: 10
            }
            ]
        }
        const course = new Course(courseObj);
        await course.save();

        const res = await request(app)
            .get('/courses/' + course.id + '/students/best');

        expect(res.statusCode).to.eql(200);
        expect(res.body._id).to.eql(student2.id);
    });

    it('should get the best student even with empty students', async () => {
        const course = new Course(data.testCourseNoStudents);
        await course.save();

        const res = await request(app)
            .get('/courses/' + course.id + '/students/best');

        expect(res.statusCode).to.eql(200);
        expect(res.body).to.eql({});
    });

    it('should get the best student even with only one student', async () => {
        const student = new Student(data.testStudent);
        await student.save();

        const courseObj = {
            ...data.testCourseNoStudents,
            students: [{
                student: student.id,
                score: 9
            }]
        }
        const course = new Course(courseObj);
        await course.save();

        const res = await request(app)
            .get('/courses/' + course.id + '/students/best');

        expect(res.statusCode).to.eql(200);
        expect(res.body._id).to.eql(student.id);
    });
});

describe('Course students addition and removal', () => {
    beforeEach((done) => {
        Course.remove({});
        Student.remove({}, (err) => {
            done();
        });
    });

    it('should be able to add students to course', async () => {
        const course = new Course(data.testCourseNoStudents);
        course.save();

        const student = new Student(data.testStudent);
        await student.save();

        const res = await request(app)
            .post('/courses/' + course.id + '/students')
            .send({
                student: student.id,
                score: 10
            });


        expect(res.statusCode).to.eql(200);
        expect(res.body.students.length).to.eql(1);
    });

    it('should not be able to add a student twice', async () => {
        const course = new Course(data.testCourseNoStudents);
        course.save();

        const student = new Student(data.testStudent);
        await student.save();

        var res = await request(app)
            .post('/courses/' + course.id + '/students')
            .send({
                student: student.id,
                score: 10
            });

        res = await request(app)
            .post('/courses/' + course.id + '/students')
            .send({
                student: student.id,
                score: 9
            });

        expect(res.statusCode).not.to.eql(200);
    });

    it('should be able to delete students from course', async () => {
        const student = new Student(data.testStudent);
        await student.save();

        const courseObj = {
            ...data.testCourseNoStudents,
            students: [{
                student: student.id,
                score: 10
            }]
        }
        const course = new Course(courseObj);
        await course.save();

        expect(course.students.length).to.eql(1);

        const res = await request(app)
            .delete('/courses/' + course.id + '/students/' + student.id)
            .send({
                student: student.id,
                score: 10
            });

        expect(res.statusCode).to.eql(204);
    });

})