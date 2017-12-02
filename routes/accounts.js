const mongoose = require('mongoose')
const Account = require('../models').account

// routes to: /accounts
module.exports = {
  //gets all accounts // curl "http://localhost:3000/accounts"
  getAccounts(req, res) {
    Account.find((err, accounts) => {
      if (err) return console.error(err);
      res.send(accounts); // send back list
    })
  },

  //gets one account by list index // "http://localhost:3000/accounts/ID"
  getOneAccount(req, res) {
    const id = req.params.accountId; //ObjectId("")
    Account.findById(id, function (err, account) { 
      if (err) return console.error(err);
      res.send(account); // send back found account
    });
  },

  // posts new account data
  // curl -H "Content-Type: application/json" -X POST -d '{"name": "savings", "balance":"10"}'  "http://localhost:3000/accounts" 
  addAccount(req, res) {
    const account = new Account(req.body);
    
    account.save(function (err, account) {
      if (err) return console.error(err);
      res.send(account); // send back added account
    });

  },

  // updates account data at specific id
  // curl -H 'Content-Type: application/json' -X PUT -d '{"name": "reName", "balance":"20"}' "http://localhost:3000/accounts/ID"
  updateAccount(req, res) {
    const id = req.params.accountId;
    const newData = req.body;
    
    // send back the updated account 
    Account.findOneAndUpdate({_id: id}, {$set: newData}, {new: true}, function(err, account){
      if (err) return console.error(err);
      res.send(account); // send back updated account
    });
  },

  //deletes account data at specific id // curl -X DELETE "http://localhost:3000/accounts/ID" 
  removeAccount(req, res) {
    const id = req.params.accountId;
    // send back the deleted account ID
    Account.findByIdAndRemove(id, function(err, account){
      if (err) return console.error(err);
      res.send(account); // send back deleted account
    });
  }
}



 

