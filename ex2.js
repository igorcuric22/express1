const express = require('express');
const app = express();
const path=require('path');
const port = 4000;

//import sqlite3 from 'sqlite3';
const sqlite3=require("sqlite3");

// open database in memory
let db = new sqlite3.Database('./baza.db', () => {
  console.log('Connected to the SQlite database.');
});




// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log(path.join(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'popx1.html'));
    console.log(path.join(__dirname, 'popx1.html'));
});

const products=
[
    {   
        id:1,
        name:"tank t55",
    },
    {
        id:2,
        name:"tank t62",
    },
    {
        id:3,
        name:"tank t64",
    },
    {
        id:4,
        name:"tank t72",
    },
];



console.log("--------------------------");
console.log(products);

app.get('/api/get/', (req, res) => {
    
    console.log(req.body);

    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Internal server error');
        } else {
          res.send(rows);
        }
      });

        
      

});



// GET single product by ID
app.get('/api/get/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);

    
    
        db.all('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
      console.log(row);
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else if (!row) {
        res.status(404).send('Product not found');
      } else {
        res.send(row);
      }
    });

    

});





app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});

