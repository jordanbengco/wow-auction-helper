import express from 'express';
import * as BodyParser from 'body-parser';

const app = express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));


app.get('/api/test', (request, response) => {
  re    sponse.send({msg: 'asd'});
});

app.listen(3000, () =>
  console.log('ready on port 3000'));
