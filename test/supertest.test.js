import app from '../app.js';
import request from 'supertest';


    it('POST /serviceLivraison',()=>{
        test('should respond with a status code 201', async() =>{
            const reponse = await request(app).POST('/serviceLivraison').send({
                nom: "rapidoexpress",
                typeCuisine: "haitienne"
            })
            expect(reponse.statusCode).toBe(201);
        })
    });