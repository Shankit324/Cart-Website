const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/cart', (req, res) => {
    if(req.body!==undefined){
        console.log(req.body);
        // let obj = JSON.parse(req.body.json);
        // console.log(obj);
        res.send(`<h3><b><i>Total amount is: ${req.body.val}</i></b></h3><br><button><h3><b><i>PAY NOW</i></b></h3></button>`);
    }
    else{
        res.send("<h3><b><i>Cart is empty...</i></b></h3>");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});