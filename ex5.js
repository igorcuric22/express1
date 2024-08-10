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



// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log(path.join(__dirname));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'popx5.html'));
    console.log(path.join(__dirname, 'popx5.html'));
});


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


// POST new product
app.post('/api/post/', (req, res) => {
    const { name } = req.body;
  
    console.log(req.body);
    let idx;
    if (!name) {
      res.status(400).send('Name and price are required');
    } else 
        {
         db.all(`select * from products order by id desc limit 1;`, [], function(err,rows) {
          
          if (err) {
            return console.log(err.message);
          }
          console.log("----+",rows);
  
          idx=rows[0].id;
          
          console.log('=======',idx,rows[0].id,rows[0].name,rows);
  
          idx++;
  
        const sql = 'INSERT INTO products (id, name) VALUES (?, ?)';
        db.run(sql, [idx,name], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal server error');
        } else {
            const idz = this.lastID;
            console.log('--------',[{ id:idx,name:name}]);
            res.status(201).send([{ id:idx,name:name}]);
        }
    });
          
  })
  
  }
  
  });

// DELETE new product
  app.delete('/api/delete/:id', (req, res) => {
    //const { name } = req.body;

    const { id } = req.params;
    console.log(id);

    db.run(`delete from products where id=?;`,[id],function(err,rows)
{

    console.log("This id:",this.lastID);
    console.log(`Deleted ${this.changes} row(s)`);


    console.log(rows);


});



   // console.log(name);
    res.send([{id:300,name:'BBBB'}]);

});




app.put('/api/put/:id', (req, res) => {
   // const { name } = req.body;

    //console.log(name);

    console.log(req.body);
    const { id } = req.params;
    
    const objIndex=products.findIndex(obj=>obj.id===parseInt(id));

    console.log("Before",products,objIndex,req.body.name);

    if(objIndex!==-1) {
        console.log(products[objIndex]);
       
        products[objIndex].name=req.body.name;
      }
    
    console.log("After",products,objIndex,req.body.name);

    console.log(id);
    
    res.send([{id:id,name:req.body.name}]);
    res.end();

});


app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
