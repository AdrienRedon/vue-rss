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

app.post('/api/fetch', (req, res) => {
    feed(req.body.url, (err, articles) => {
        if (err) res.send([]);
        res.send(articles);
    });
});

server.listen(1337, () => console.log('Magic happens on port 1337'));
