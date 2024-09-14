import express from 'express';

const app = express();

app.get(
    '/', 
    (req, res) => {
        res.send('Hello from my lovely new server!');
    }
);

export default app;