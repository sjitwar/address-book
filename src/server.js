const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/records', (req, res) => {
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });
});

app.post('/api/records', (req, res) => {
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
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

app.put('/api/records/:id', (req, res) => {
  fs.readFile('./Data.json', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
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

