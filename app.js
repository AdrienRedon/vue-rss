const express = require('express');
const axios = require('axios');
const http = require('http');
const bodyParser = require('body-parser');

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
    axios.get(req.body.url)
        .then(response => res.send(response.data));
});


console.log('')
server.listen(1337, () => console.log('Magic happens on port 1337'));