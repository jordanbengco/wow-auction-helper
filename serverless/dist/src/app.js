"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const BodyParser = require("body-parser");
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.get('/api/test', (request, response) => {
    response.send({ msg: 'asd' });
});
app.listen(3000, () => console.log('ready on port 3000'));
