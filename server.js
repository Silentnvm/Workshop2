import express from 'express';
import serverless from "serverless-http";
import fetch from 'node-fetch';

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/location-info', async (req, res) => {
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching location data:', error);
      res.status(500).send('Failed to retrieve location data');
    }
  });  

app.get('/', (req, res) => {
    res.send('Bun venit la serverul meu Express!');
});

module.exports.handler = serverless(app);