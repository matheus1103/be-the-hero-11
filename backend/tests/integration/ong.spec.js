const request = require ('supertest');
const app = require('../../src/app');
const conection = require ('../../src/database/connection')
describe('ONG', () =>{
    beforeEach(async ()=>{
        await conection.migrate.rollback()
        await conection.migrate.latest()
    });

    afterAll(async()=>{
        await conection.destroy();
    });

    it('should be able to create a new ONG', async ()=>{
        const response = await request(app)
        .post('/ongs')
        .send({
                name:"APAD2",
                email:"contato@contato.com",
                whatsapp:"9999999999",
                city: "Rio do Sul",
                uf: "SC"
            	
        });

        expect (response.body).toHaveProperty('id');
        expect (response.body.id).toHaveLength(8);
    });
});
