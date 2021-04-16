import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import User from '../models/User';
import data from './fixture.json'


describe('Basic user auth', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    it('should login as existing user', async () => {
        const userCreated = new User({
            username: data.user.username,
            password: await User.encryptPassword(data.user.password)
        });
        await userCreated.save()

        const res = await request(app)
            .post('/auth/login')
            .send(data.user);

        expect(res.statusCode).to.eql(200);
    })

});