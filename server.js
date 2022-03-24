'use strict';
let express = require('express');
let path = require('path');
let fs = require('fs');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, HOST);
console.log(`Aplicación corriendo en: http://${HOST}:${PORT}`);