const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const feed = require("feed-read-parser");

let app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/dist', express.static('dist'));
app.use('/src', express.static('src'));
app.use('/', express.static('public'));

app.post('/fetch', (req, res) => {
    feed(req.body.url, (err, articles) => {
        if (err) throw err;
        res.send(articles);
    });
});


console.log('')
server.listen(1337, () => console.log('Magic happens on port 1337'));