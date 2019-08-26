let express = require('express');
let router = express.Router();

let db = [];

//add to database
router.get('/newItem/id/:name/:quantity/:price', function (req, res) {
    newId = Math.round(Math.random() * 1000)
    entry = {
        id: newId,
        name: req.params.name,
        quantity: parseInt(req.params.quantity),
        price: parseInt(req.params.price)
    }
    db.push(entry);
    console.log(db);
    res.send("you have added a new entry to the database your entry ID is : " + entry.id);

})
//delete item database
router.get('/deleteItem/:id', function (req, res) {
    let id = parseInt(req.params.id);
    let index = db.findIndex(element => {
        if (element.id === id) {
            return true;
        } else return false;
    });
    
//    let index = db.findIndex(element => {return element.id === id});

    console.log(id);
    console.log(index);
    if (index === -1) {

        res.send("item does not exist");
    } else {
        db.splice(index, 1);
        res.send("we deleted entry ID : " + id + " the data base the current database is : <br>" + generateList());
    }
})

// create list of all items in the database and prints them for client. 
router.get('/listItems', function (req, res) {
    res.send(generateList());

})
// return the total value 
router.get('/totalValue', function (req, res) {

    res.send("The warehouse current total value is equal to : " + warehouseValue())

})



function generateList() {
    let st = 'ID:    NAME:  Quantity:  Price: Cost: </br>';
    let cost = 0;
    for (let i = 0; i < db.length; i++) {
        cost = db[i].quantity * db[i].price;
        st += db[i].id + ' | ' + db[i].name + ' | ' + db[i].quantity + '     | ' + db[i].price + '     | ' + cost + '</br>';
    }
    return st;
}

function warehouseValue() {
    let value = 0;
    for (let i = 0; i < db.length; i++) {
        cost = db[i].quantity * db[i].price;
        value += cost;
    }
    return value
}

module.exports = router;
