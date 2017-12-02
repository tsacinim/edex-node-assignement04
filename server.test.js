const app = require('./server')
const request = require('supertest');
const util = require('util');

// Testing
const test = request(app);

//example test for: curl -X POST "http://localhost:3000/accounts ..."  
test.post('/accounts')
  .send({
    "name": "savings", 
    "balance":"1000" 
  })
  .set('Content-Type', 'application/json')
  .expect('Content-Type', /json/)
  .expect(200, /savings/)
  .then(function(res) {
    console.log(res.body);
    const testID = res.body._id;
    console.log('OK: got a 200 from: POST /accounts')

    //example test for: curl "http://localhost:3000/accounts/ID"  
    test.get(`/accounts/${testID}`)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, /1000/)
      .end(function(err, res) {
        if (err) throw err;
        console.log(`OK: got a 200 from: GET /accounts/${testID}`)
      });

    //example test for: curl "http://localhost:3000/accounts"
    test.get('/accounts') 
      .expect('Content-Type', /json/)
      .expect(200, /savings/) 
      .end(function(err, res) {
        if (err) throw err;
        console.log('OK: got a 200 from: GET /accounts')
      });
  
    //example test for: PUT curl "http://localhost:3000/accounts/ID"
    test.put(`/accounts/${testID}`)
      .send({
        "balance":"777" 
      })
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, /777/) 
      .then(function(res) {
        console.log(`OK: got a 200 from: PUT /accounts/${testID}`)
      
        //example test for: DELETE curl "http://localhost:3000/accounts/ID"
        test.delete(`/accounts/${testID}`)
          .expect('Content-Type', /json/)
          .expect(200, new RegExp(`${testID}`))
          .expect(200, /777/)
          .end(function(err, res) {
            if (err) throw err;
            console.log(`OK: got a 200 from: DELETE /accounts/${testID}`)
          }); 
        })
        .catch(function(err) {
          throw err;
        }); 

    // example test for missing route parameter  
    // test.put('/accounts/5a2118d345e83b45f8684f90')
    test.put('/accounts/666666666666666666666666')
    .send({
      "name": "Updating a nonexisting account should fail"
    })
    .set('Content-Type', 'application/json')
    .expect(200, '') 
    .end(function(err, res) {
      if (err) throw err;
      console.log('OK: got empy body from GET /accounts/666');
      process.exit(0)    
    });

    // example test for missing route path  
    test.get('/nope') 
    .expect('Content-Type', /text/)
    .expect(404) 
    .end(function(err, res) {
      if (err) throw err;
      console.log('OK: got a 404 from: GET /nope');
    });

  })
  .catch(function(err) {
    throw err;
  });


/*


*/  
