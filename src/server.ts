import express, { request, response } from 'express';

const app = express();

app.post("/", (request, response) => {
  return response.json({message: "oi vc"})
});

app.listen(3333, () => console.log('voa guri'))