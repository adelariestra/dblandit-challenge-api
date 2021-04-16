import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';
const expect = chai.expect;

import data from './fixture.json'


describe('Basic user auth', () => {

    it('should login as existing user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send(data.user);

        expect(res.statusCode).to.eql(200);
    })

});