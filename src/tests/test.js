import app from '../app'
import '../database'

import request from 'supertest';
import chai from 'chai';

const expect = chai.expect;

describe('Post Endpoints', () => {
  it('should create a new student', async () => {
    const res = await request(app)
      .post('/students')
      .send({
        fname: "Arturo Hector",
        lname: "De la Riestra",
        dni: 41780699,
        address: "Psherman Calle Wallaby 42 sidney"
      });
    
    expect(res.statusCode).to.eql(201)
    expect(res.body).to.haveOwnProperty('_id')
  })
})