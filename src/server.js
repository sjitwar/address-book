const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors()); // to tackle cors erros in console
app.use(express.json());

// GET request to fetch all records 
app.get('/api/records', (req, res) => {
    // reading the json file
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    // records sent as a response
    res.send(JSON.parse(data));
  });
});

// POST request to add new record
app.post('/api/records', (req, res) => {
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    // add new record to array then write to file
    const entries = JSON.parse(data);
    entries.push(req.body);
    fs.writeFile('./Data.json', JSON.stringify(entries), err => {
      if (err) {
        throw err;
      }
      res.send('Record added.');
    });
  });
});

// PUT request to edit/update record
app.put('/api/records/:id', (req, res) => {
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    // update record with the id/indexed passed
    const records = JSON.parse(data);
    const updatedRecords = records.map((record, index) => {
      if (index === parseInt(req.params.id)) {
        return req.body;
      }
      return record;
    });
    fs.writeFile('./Data.json', JSON.stringify(updatedRecords), err => {
      if (err) {
        throw err;
      }
      res.send('Record updated.');
    });
  });
});

// DELETE request to delete record in file
app.delete('/api/Records/:id', (req, res) => {
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    let records = JSON.parse(data);
    records = records.filter((record, index) => index !== parseInt(req.params.id));
    fs.writeFile('./Data.json', JSON.stringify(records), err => {
      if (err) {
        throw err;
      }
      res.send('Record deleted.');
    });
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

